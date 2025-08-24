const jwt = require('jsonwebtoken');
const User = require('../models/User');

// حماية المسارات - التحقق من JWT
exports.protect = async (req, res, next) => {
  let token;

  // التحقق من وجود الرمز في الهيدر
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // التحقق من وجود الرمز
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'غير مخول للوصول لهذا المسار'
    });
  }

  try {
    // التحقق من صحة الرمز
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // البحث عن المستخدم
    const user = await User.findById(decoded.id).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // التحقق من أن الحساب نشط
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'تم إيقاف هذا الحساب'
      });
    }

    // تحديث آخر دخول
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'رمز غير صحيح'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'انتهت صلاحية الرمز'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// تقييد الوصول حسب الأدوار
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `دور ${req.user.role} غير مخول للوصول لهذا المسار`
      });
    }
    next();
  };
};

// حماية اختيارية - للزوار والمستخدمين المسجلين
exports.optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (user && user.isActive) {
        req.user = user;
      }
    } catch (error) {
      // تجاهل الأخطاء للمصادقة الاختيارية
      console.log('خطأ في المصادقة الاختيارية:', error.message);
    }
  }

  next();
};

// التحقق من ملكية المورد
exports.checkOwnership = (Model, resourceField = 'user') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'المورد غير موجود'
        });
      }

      // السماح للأدمن
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // التحقق من الملكية
      const resourceUserId = resource[resourceField];
      const userId = req.user._id;

      if (resourceUserId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'غير مخول للوصول لهذا المورد'
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'خطأ في الخادم'
      });
    }
  };
};

// التحقق من التحقق من البريد الإلكتروني
exports.requireVerification = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'يجب تأكيد البريد الإلكتروني أولاً'
    });
  }
  next();
};

// التحقق من أن المستخدم حرفي
exports.requireCraftsman = async (req, res, next) => {
  if (req.user.role !== 'craftsman') {
    return res.status(403).json({
      success: false,
      message: 'هذا المسار مخصص للحرفيين فقط'
    });
  }

  try {
    const Craftsman = require('../models/Craftsman');
    const craftsman = await Craftsman.findOne({ user: req.user._id });
    
    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'ملف الحرفي غير موجود'
      });
    }

    req.craftsman = craftsman;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// التحقق من أن الحرفي محقق
exports.requireVerifiedCraftsman = async (req, res, next) => {
  if (!req.craftsman.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'يجب تأكيد حساب الحرفي من قبل الإدارة'
    });
  }
  next();
};

// تسجيل محاولات الدخول
exports.logActivity = (action) => {
  return (req, res, next) => {
    if (req.user) {
      console.log(`[${new Date().toISOString()}] المستخدم ${req.user.name} (${req.user.email}) قام بـ: ${action}`);
    }
    next();
  };
};