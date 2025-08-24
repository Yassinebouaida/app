const mongoose = require('mongoose');

const craftsmanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'اسم النشاط التجاري مطلوب'],
    trim: true,
    maxlength: [100, 'اسم النشاط لا يجب أن يتجاوز 100 حرف']
  },
  specializations: [{
    category: {
      type: String,
      required: true,
      enum: [
        'electrical', // كهرباء
        'plumbing', // سباكة
        'carpentry', // نجارة
        'painting', // دهان
        'airconditioning', // تكييف وتبريد
        'appliance_repair', // إصلاح أجهزة
        'masonry', // بناء وحجارة
        'welding', // لحام
        'gardening', // بستنة
        'cleaning', // تنظيف
        'automotive', // سيارات
        'electronics', // إلكترونيات
        'roofing', // أسطح
        'flooring', // أرضيات
        'glass', // زجاج
        'security', // أمن وحماية
        'other' // أخرى
      ]
    },
    subcategory: String,
    experience: {
      type: Number,
      min: [0, 'سنوات الخبرة لا يمكن أن تكون سالبة'],
      max: [50, 'سنوات الخبرة لا يمكن أن تتجاوز 50 سنة']
    }
  }],
  description: {
    type: String,
    required: [true, 'وصف الخدمات مطلوب'],
    maxlength: [1000, 'الوصف لا يجب أن يتجاوز 1000 حرف']
  },
  workingHours: {
    monday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    thursday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    friday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    saturday: { start: String, end: String, isWorking: { type: Boolean, default: true } },
    sunday: { start: String, end: String, isWorking: { type: Boolean, default: false } }
  },
  serviceAreas: [{
    city: String,
    districts: [String]
  }],
  pricing: {
    hourlyRate: {
      type: Number,
      min: [0, 'السعر بالساعة لا يمكن أن يكون سالب']
    },
    calloutFee: {
      type: Number,
      default: 0,
      min: [0, 'رسوم الخدمة لا يمكن أن تكون سالبة']
    },
    minimumCharge: {
      type: Number,
      default: 0,
      min: [0, 'الحد الأدنى للتكلفة لا يمكن أن يكون سالب']
    }
  },
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    completedDate: Date
  }],
  certifications: [{
    name: String,
    issuingOrganization: String,
    issueDate: Date,
    expiryDate: Date,
    certificateImage: String
  }],
  tools: [{
    name: String,
    description: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'التقييم لا يمكن أن يكون سالب'],
      max: [5, 'التقييم لا يمكن أن يتجاوز 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'التعليق لا يجب أن يتجاوز 500 حرف']
    },
    serviceRequest: {
      type: mongoose.Schema.ObjectId,
      ref: 'ServiceRequest'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  completedJobs: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: String,
    documentType: {
      type: String,
      enum: ['id', 'license', 'insurance', 'certification']
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  emergencyService: {
    type: Boolean,
    default: false
  },
  responseTime: {
    type: String,
    enum: ['immediate', 'within_hour', 'within_day', 'within_week'],
    default: 'within_day'
  },
  languages: [{
    type: String,
    enum: ['ar', 'en']
  }],
  socialMedia: {
    website: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    iban: String
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// إنشاء فهرس للبحث النصي
craftsmanSchema.index({
  businessName: 'text',
  description: 'text',
  'specializations.category': 'text',
  'specializations.subcategory': 'text'
});

// إنشاء فهرس للموقع الجغرافي
craftsmanSchema.index({ 'serviceAreas.city': 1, 'serviceAreas.districts': 1 });

// Virtual لحساب متوسط التقييم
craftsmanSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

// تحديث متوسط التقييم عند إضافة مراجعة جديدة
craftsmanSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = Math.round((sum / this.reviews.length) * 10) / 10;
    this.rating.count = this.reviews.length;
  }
  return this.save();
};

// التحقق من توفر الحرفي في وقت معين
craftsmanSchema.methods.isAvailableAt = function(dayOfWeek, time) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = days[dayOfWeek];
  
  if (!this.workingHours[day] || !this.workingHours[day].isWorking) {
    return false;
  }
  
  const startTime = this.workingHours[day].start;
  const endTime = this.workingHours[day].end;
  
  return time >= startTime && time <= endTime;
};

// البحث عن الحرفيين حسب التخصص والموقع
craftsmanSchema.statics.findBySpecializationAndLocation = function(specialization, city, district) {
  const query = {
    isVerified: true,
    isAvailable: true,
    'specializations.category': specialization
  };
  
  if (city) {
    query['serviceAreas.city'] = city;
  }
  
  if (district) {
    query['serviceAreas.districts'] = district;
  }
  
  return this.find(query).populate('user', 'name avatar phone location');
};

module.exports = mongoose.model('Craftsman', craftsmanSchema);