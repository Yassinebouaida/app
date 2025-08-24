const express = require('express');
const crypto = require('crypto');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Craftsman = require('../models/Craftsman');

const router = express.Router();

// إرسال JWT response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      language: user.language
    }
  });
};

// @desc    تسجيل مستخدم جديد
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, location, language } = req.body;

    // التحقق من وجود جميع البيانات المطلوبة
    if (!name || !email || !phone || !password || !location) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال جميع البيانات المطلوبة'
      });
    }

    // التحقق من صحة كلمة المرور
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
      });
    }

    // التحقق من عدم وجود البريد الإلكتروني
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مستخدم مسبقاً'
      });
    }

    // إنشاء المستخدم
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user',
      location,
      language: language || 'ar'
    });

    // إنشاء ملف حرفي إذا كان الدور حرفي
    if (user.role === 'craftsman') {
      const { businessName, specializations, description } = req.body;
      
      if (!businessName || !specializations || !description) {
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({
          success: false,
          message: 'يرجى إدخال جميع بيانات الحرفي المطلوبة'
        });
      }

      await Craftsman.create({
        user: user._id,
        businessName,
        specializations,
        description,
        serviceAreas: [{ city: location.city, districts: [location.district] }],
        languages: [language || 'ar']
      });
    }

    // إرسال رمز التحقق من البريد الإلكتروني (محاكاة)
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 ساعة

    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('خطأ في التسجيل:', error);
    
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    تسجيل الدخول
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود البيانات
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
      });
    }

    // البحث عن المستخدم مع كلمة المرور
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // التحقق من كلمة المرور
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // التحقق من أن الحساب نشط
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'تم إيقاف هذا الحساب'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    تسجيل الخروج
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح'
  });
});

// @desc    الحصول على المستخدم الحالي
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    let userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      avatar: req.user.avatar,
      location: req.user.location,
      isVerified: req.user.isVerified,
      language: req.user.language,
      createdAt: req.user.createdAt
    };

    // إضافة بيانات الحرفي إذا كان المستخدم حرفي
    if (req.user.role === 'craftsman') {
      const craftsman = await Craftsman.findOne({ user: req.user._id });
      if (craftsman) {
        userData.craftsman = craftsman;
      }
    }

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.error('خطأ في الحصول على بيانات المستخدم:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    تحديث كلمة المرور
// @route   PUT /api/auth/updatepassword
// @access  Private
router.put('/updatepassword', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال كلمة المرور الحالية والجديدة'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // التحقق من كلمة المرور الحالية
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'كلمة المرور الحالية غير صحيحة'
      });
    }

    // التحقق من طول كلمة المرور الجديدة
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'
      });
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('خطأ في تحديث كلمة المرور:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    نسيان كلمة المرور
// @route   POST /api/auth/forgotpassword
// @access  Public
router.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال البريد الإلكتروني'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'لا يوجد مستخدم بهذا البريد الإلكتروني'
      });
    }

    // إنشاء رمز إعادة تعيين
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // إرسال البريد الإلكتروني (محاكاة)
    console.log(`رمز إعادة تعيين كلمة المرور: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'تم إرسال رابط إعادة تعيين كلمة المرور للبريد الإلكتروني',
      resetToken // في الإنتاج، لا يجب إرسال الرمز في الاستجابة
    });
  } catch (error) {
    console.error('خطأ في نسيان كلمة المرور:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    إعادة تعيين كلمة المرور
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
router.put('/resetpassword/:resettoken', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال كلمة المرور الجديدة'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
      });
    }

    // تشفير الرمز
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'رمز غير صحيح أو منتهي الصلاحية'
      });
    }

    // تعيين كلمة المرور الجديدة
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    تأكيد البريد الإلكتروني
// @route   GET /api/auth/verify/:token
// @access  Public
router.get('/verify/:token', async (req, res) => {
  try {
    const emailVerificationToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح أو منتهي الصلاحية'
      });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'تم تأكيد البريد الإلكتروني بنجاح'
    });
  } catch (error) {
    console.error('خطأ في تأكيد البريد الإلكتروني:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

module.exports = router;