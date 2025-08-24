const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');
const Craftsman = require('../models/Craftsman');
const User = require('../models/User');

const router = express.Router();

// @desc    الحصول على جميع الحرفيين
// @route   GET /api/craftsmen
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      category, 
      city, 
      district, 
      search, 
      sort, 
      page = 1, 
      limit = 10 
    } = req.query;

    // بناء الاستعلام
    let query = { isVerified: true, isAvailable: true };

    if (category) {
      query['specializations.category'] = category;
    }

    if (city) {
      query['serviceAreas.city'] = city;
    }

    if (district) {
      query['serviceAreas.districts'] = district;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // الترتيب
    let sortBy = {};
    if (sort) {
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      sortBy[sortField] = sortOrder;
    } else {
      sortBy = { 'rating.average': -1, completedJobs: -1 };
    }

    // الصفحات
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const craftsmen = await Craftsman.find(query)
      .populate('user', 'name avatar phone location')
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    const total = await Craftsman.countDocuments(query);

    res.status(200).json({
      success: true,
      count: craftsmen.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: craftsmen
    });
  } catch (error) {
    console.error('خطأ في جلب الحرفيين:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    الحصول على حرفي واحد
// @route   GET /api/craftsmen/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const craftsman = await Craftsman.findById(req.params.id)
      .populate('user', 'name avatar phone email location')
      .populate('reviews.user', 'name avatar');

    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'الحرفي غير موجود'
      });
    }

    res.status(200).json({
      success: true,
      data: craftsman
    });
  } catch (error) {
    console.error('خطأ في جلب الحرفي:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    إنشاء أو تحديث ملف الحرفي
// @route   POST /api/craftsmen
// @access  Private/Craftsman
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'craftsman') {
      return res.status(403).json({
        success: false,
        message: 'هذا المسار مخصص للحرفيين فقط'
      });
    }

    // التحقق من وجود ملف حرفي موجود
    let craftsman = await Craftsman.findOne({ user: req.user.id });

    if (craftsman) {
      // تحديث الملف الموجود
      craftsman = await Craftsman.findByIdAndUpdate(
        craftsman._id,
        { ...req.body, user: req.user.id },
        { new: true, runValidators: true }
      ).populate('user', 'name avatar phone email location');
    } else {
      // إنشاء ملف جديد
      craftsman = await Craftsman.create({
        ...req.body,
        user: req.user.id
      });
      await craftsman.populate('user', 'name avatar phone email location');
    }

    res.status(201).json({
      success: true,
      data: craftsman
    });
  } catch (error) {
    console.error('خطأ في إنشاء/تحديث ملف الحرفي:', error);
    
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

// @desc    تحديث ملف الحرفي
// @route   PUT /api/craftsmen/:id
// @access  Private/Craftsman
router.put('/:id', protect, async (req, res) => {
  try {
    let craftsman = await Craftsman.findById(req.params.id);

    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'الحرفي غير موجود'
      });
    }

    // التحقق من الصلاحية
    if (craftsman.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مخول لتحديث هذا الملف'
      });
    }

    craftsman = await Craftsman.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'name avatar phone email location');

    res.status(200).json({
      success: true,
      data: craftsman
    });
  } catch (error) {
    console.error('خطأ في تحديث ملف الحرفي:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    إضافة تقييم للحرفي
// @route   POST /api/craftsmen/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const craftsman = await Craftsman.findById(req.params.id);

    if (!craftsman) {
      return res.status(404).json({
        success: false,
        message: 'الحرفي غير موجود'
      });
    }

    // التحقق من أن المستخدم لم يقيم من قبل
    const existingReview = craftsman.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'لقد قمت بتقييم هذا الحرفي من قبل'
      });
    }

    const review = {
      user: req.user.id,
      rating,
      comment
    };

    craftsman.reviews.push(review);
    await craftsman.updateRating();

    res.status(201).json({
      success: true,
      message: 'تم إضافة التقييم بنجاح'
    });
  } catch (error) {
    console.error('خطأ في إضافة التقييم:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// @desc    البحث عن الحرفيين
// @route   GET /api/craftsmen/search
// @access  Public
router.get('/search/location', async (req, res) => {
  try {
    const { specialization, city, district } = req.query;

    if (!specialization) {
      return res.status(400).json({
        success: false,
        message: 'التخصص مطلوب'
      });
    }

    const craftsmen = await Craftsman.findBySpecializationAndLocation(
      specialization,
      city,
      district
    );

    res.status(200).json({
      success: true,
      count: craftsmen.length,
      data: craftsmen
    });
  } catch (error) {
    console.error('خطأ في البحث:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

module.exports = router;