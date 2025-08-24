const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Craftsman = require('../models/Craftsman');
const ServiceRequest = require('../models/ServiceRequest');

const router = express.Router();

// جميع المسارات تتطلب صلاحيات الأدمن
router.use(protect);
router.use(authorize('admin'));

// @desc    الحصول على إحصائيات عامة
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCraftsmen = await Craftsman.countDocuments();
    const totalRequests = await ServiceRequest.countDocuments();
    const pendingVerifications = await Craftsman.countDocuments({ isVerified: false });

    const stats = {
      totalUsers,
      totalCraftsmen,
      totalRequests,
      pendingVerifications,
      verifiedCraftsmen: await Craftsman.countDocuments({ isVerified: true }),
      completedRequests: await ServiceRequest.countDocuments({ status: 'completed' }),
      activeUsers: await User.countDocuments({ isActive: true }),
      recentUsers: await User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('خطأ في جلب الإحصائيات:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    الحصول على قائمة المستخدمين
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;

    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: users
    });
  } catch (error) {
    console.error('خطأ في جلب المستخدمين:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    تحديث حالة التحقق للحرفي
// @route   PUT /api/admin/craftsmen/:id/verify
// @access  Private/Admin
router.put('/craftsmen/:id/verify', async (req, res) => {
  try {
    const { isVerified } = req.body;

    const craftsman = await Craftsman.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    ).populate('user', 'name email');

    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'الحرفي غير موجود'
      });
    }

    res.status(200).json({
      success: true,
      message: `تم ${isVerified ? 'تأكيد' : 'إلغاء تأكيد'} الحرفي بنجاح`,
      data: craftsman
    });
  } catch (error) {
    console.error('خطأ في تحديث حالة التحقق:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

module.exports = router;