const express = require('express');
const router = express.Router();

// @desc    الحصول على قائمة الخدمات المتاحة
// @route   GET /api/services
// @access  Public
router.get('/', (req, res) => {
  const services = [
    { key: 'electrical', nameAr: 'كهرباء', nameEn: 'Electrical' },
    { key: 'plumbing', nameAr: 'سباكة', nameEn: 'Plumbing' },
    { key: 'carpentry', nameAr: 'نجارة', nameEn: 'Carpentry' },
    { key: 'painting', nameAr: 'دهان', nameEn: 'Painting' },
    { key: 'airconditioning', nameAr: 'تكييف وتبريد', nameEn: 'Air Conditioning' },
    { key: 'appliance_repair', nameAr: 'إصلاح أجهزة', nameEn: 'Appliance Repair' },
    { key: 'masonry', nameAr: 'بناء وحجارة', nameEn: 'Masonry' },
    { key: 'welding', nameAr: 'لحام', nameEn: 'Welding' },
    { key: 'gardening', nameAr: 'بستنة', nameEn: 'Gardening' },
    { key: 'cleaning', nameAr: 'تنظيف', nameEn: 'Cleaning' },
    { key: 'automotive', nameAr: 'سيارات', nameEn: 'Automotive' },
    { key: 'electronics', nameAr: 'إلكترونيات', nameEn: 'Electronics' },
    { key: 'roofing', nameAr: 'أسطح', nameEn: 'Roofing' },
    { key: 'flooring', nameAr: 'أرضيات', nameEn: 'Flooring' },
    { key: 'glass', nameAr: 'زجاج', nameEn: 'Glass' },
    { key: 'security', nameAr: 'أمن وحماية', nameEn: 'Security' },
    { key: 'other', nameAr: 'أخرى', nameEn: 'Other' }
  ];

  res.status(200).json({
    success: true,
    data: services
  });
});

module.exports = router;