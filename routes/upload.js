const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');

const router = express.Router();

// إعداد multer للتحميل
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // قبول الصور فقط
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('يجب أن يكون الملف صورة'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// @desc    تحميل صورة واحدة
// @route   POST /api/upload/image
// @access  Private
router.post('/image', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم تحديد ملف'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'تم تحميل الصورة بنجاح',
      data: {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('خطأ في تحميل الصورة:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحميل الصورة'
    });
  }
});

// @desc    تحميل عدة صور
// @route   POST /api/upload/images
// @access  Private
router.post('/images', protect, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'لم يتم تحديد ملفات'
      });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size
    }));

    res.status(200).json({
      success: true,
      message: 'تم تحميل الصور بنجاح',
      data: uploadedFiles
    });
  } catch (error) {
    console.error('خطأ في تحميل الصور:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحميل الصور'
    });
  }
});

// معالجة أخطاء multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'حجم الملف كبير جداً (الحد الأقصى 5MB)'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'خطأ في تحميل الملف'
  });
});

module.exports = router;