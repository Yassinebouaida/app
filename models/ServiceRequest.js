const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  craftsman: {
    type: mongoose.Schema.ObjectId,
    ref: 'Craftsman',
    default: null
  },
  title: {
    type: String,
    required: [true, 'عنوان الطلب مطلوب'],
    trim: true,
    maxlength: [100, 'العنوان لا يجب أن يتجاوز 100 حرف']
  },
  description: {
    type: String,
    required: [true, 'وصف المشكلة مطلوب'],
    maxlength: [1000, 'الوصف لا يجب أن يتجاوز 1000 حرف']
  },
  category: {
    type: String,
    required: [true, 'تصنيف الخدمة مطلوب'],
    enum: [
      'electrical', 'plumbing', 'carpentry', 'painting', 'airconditioning',
      'appliance_repair', 'masonry', 'welding', 'gardening', 'cleaning',
      'automotive', 'electronics', 'roofing', 'flooring', 'glass',
      'security', 'other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  location: {
    address: {
      type: String,
      required: [true, 'العنوان مطلوب']
    },
    city: {
      type: String,
      required: [true, 'المدينة مطلوبة']
    },
    district: {
      type: String,
      required: [true, 'الحي مطلوب']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    accessInstructions: {
      type: String,
      maxlength: [500, 'تعليمات الوصول لا يجب أن تتجاوز 500 حرف']
    }
  },
  preferredSchedule: {
    type: {
      type: String,
      enum: ['asap', 'today', 'tomorrow', 'this_week', 'specific_date'],
      default: 'asap'
    },
    specificDate: Date,
    timeSlot: {
      type: String,
      enum: ['morning', 'afternoon', 'evening', 'anytime']
    }
  },
  images: [{
    url: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  budget: {
    min: {
      type: Number,
      min: [0, 'الحد الأدنى للميزانية لا يمكن أن يكون سالب']
    },
    max: {
      type: Number,
      min: [0, 'الحد الأقصى للميزانية لا يمكن أن يكون سالب']
    },
    currency: {
      type: String,
      default: 'SAR'
    }
  },
  status: {
    type: String,
    enum: [
      'pending',      // في انتظار الموافقة
      'approved',     // تمت الموافقة
      'assigned',     // تم تعيين حرفي
      'in_progress',  // قيد التنفيذ
      'completed',    // مكتمل
      'cancelled',    // ملغي
      'rejected'      // مرفوض
    ],
    default: 'pending'
  },
  proposals: [{
    craftsman: {
      type: mongoose.Schema.ObjectId,
      ref: 'Craftsman',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [500, 'الرسالة لا يجب أن تتجاوز 500 حرف']
    },
    estimatedCost: {
      amount: {
        type: Number,
        required: true,
        min: [0, 'التكلفة المقدرة لا يمكن أن تكون سالبة']
      },
      breakdown: [{
        item: String,
        cost: Number
      }]
    },
    estimatedDuration: {
      value: Number,
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks']
      }
    },
    proposedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  acceptedProposal: {
    type: mongoose.Schema.ObjectId,
    ref: 'ServiceRequest.proposals'
  },
  workDetails: {
    startDate: Date,
    endDate: Date,
    actualCost: {
      amount: Number,
      breakdown: [{
        item: String,
        cost: Number
      }]
    },
    workNotes: [{
      note: String,
      addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    workImages: [{
      url: String,
      description: String,
      stage: {
        type: String,
        enum: ['before', 'during', 'after']
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'bank_transfer', 'digital_wallet'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'partial', 'refunded'],
      default: 'pending'
    },
    amount: Number,
    paidAt: Date,
    transactionId: String
  },
  rating: {
    userRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'التعليق لا يجب أن يتجاوز 500 حرف']
      },
      ratedAt: Date
    },
    craftsmanRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [500, 'التعليق لا يجب أن يتجاوز 500 حرف']
      },
      ratedAt: Date
    }
  },
  communications: [{
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'voice', 'location'],
      default: 'text'
    },
    attachments: [String],
    sentAt: {
      type: Date,
      default: Date.now
    },
    readAt: Date
  }],
  isEmergency: {
    type: Boolean,
    default: false
  },
  tags: [String],
  internalNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// إنشاء فهارس للبحث السريع
serviceRequestSchema.index({ user: 1, createdAt: -1 });
serviceRequestSchema.index({ craftsman: 1, createdAt: -1 });
serviceRequestSchema.index({ category: 1, status: 1 });
serviceRequestSchema.index({ 'location.city': 1, 'location.district': 1 });
serviceRequestSchema.index({ status: 1, createdAt: -1 });
serviceRequestSchema.index({ urgency: 1, createdAt: -1 });

// فهرس للبحث النصي
serviceRequestSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  subcategory: 'text'
});

// Virtual لحساب عدد العروض
serviceRequestSchema.virtual('proposalCount').get(function() {
  return this.proposals ? this.proposals.length : 0;
});

// Virtual لحساب المدة منذ الإنشاء
serviceRequestSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const created = this.createdAt;
  const diffInMs = now - created;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'منذ أقل من ساعة';
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  }
});

// Middleware لتحديث حالة الطلب عند قبول عرض
serviceRequestSchema.pre('save', function(next) {
  if (this.isModified('acceptedProposal') && this.acceptedProposal) {
    this.status = 'assigned';
    
    // تحديث حالة العرض المقبول
    const acceptedProposal = this.proposals.id(this.acceptedProposal);
    if (acceptedProposal) {
      acceptedProposal.status = 'accepted';
      
      // رفض العروض الأخرى
      this.proposals.forEach(proposal => {
        if (proposal._id.toString() !== this.acceptedProposal.toString()) {
          proposal.status = 'rejected';
        }
      });
    }
  }
  next();
});

// طريقة لقبول عرض
serviceRequestSchema.methods.acceptProposal = function(proposalId) {
  const proposal = this.proposals.id(proposalId);
  
  if (!proposal) {
    throw new Error('العرض غير موجود');
  }
  
  if (proposal.status !== 'pending') {
    throw new Error('لا يمكن قبول هذا العرض');
  }
  
  this.acceptedProposal = proposalId;
  this.craftsman = proposal.craftsman;
  
  return this.save();
};

// طريقة للحصول على العروض المعلقة
serviceRequestSchema.methods.getPendingProposals = function() {
  return this.proposals.filter(proposal => proposal.status === 'pending');
};

// طريقة لإضافة رسالة
serviceRequestSchema.methods.addMessage = function(senderId, message, messageType = 'text', attachments = []) {
  this.communications.push({
    sender: senderId,
    message,
    messageType,
    attachments
  });
  
  return this.save();
};

// طريقة للتحقق من صلاحية المستخدم للوصول للطلب
serviceRequestSchema.methods.canAccess = function(userId, userRole) {
  if (userRole === 'admin') return true;
  
  if (this.user.toString() === userId.toString()) return true;
  
  if (this.craftsman && this.craftsman.toString() === userId.toString()) return true;
  
  // التحقق من وجود عرض من هذا الحرفي
  const hasProposal = this.proposals.some(proposal => 
    proposal.craftsman.toString() === userId.toString()
  );
  
  return hasProposal;
};

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);