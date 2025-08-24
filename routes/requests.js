const express = require('express');
const { protect } = require('../middleware/auth');
const ServiceRequest = require('../models/ServiceRequest');

const router = express.Router();

// @desc    إنشاء طلب خدمة جديد
// @route   POST /api/requests
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: serviceRequest
    });
  } catch (error) {
    console.error('خطأ في إنشاء طلب الخدمة:', error);
    
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

// @desc    الحصول على طلبات المستخدم
// @route   GET /api/requests
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    
    if (req.user.role === 'user') {
      query.user = req.user.id;
    } else if (req.user.role === 'craftsman') {
      // الحصول على الطلبات المناسبة للحرفي
      query.status = { $in: ['pending', 'approved'] };
    } else if (req.user.role === 'admin') {
      // الأدمن يرى جميع الطلبات
    }

    const requests = await ServiceRequest.find(query)
      .populate('user', 'name phone location')
      .populate('craftsman', 'businessName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    الحصول على طلب خدمة واحد
// @route   GET /api/requests/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('user', 'name phone email location')
      .populate('craftsman', 'businessName user')
      .populate('proposals.craftsman', 'businessName user');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    // التحقق من صلاحية الوصول
    if (!request.canAccess(req.user.id, req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مخول للوصول لهذا الطلب'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('خطأ في جلب الطلب:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

module.exports = router;