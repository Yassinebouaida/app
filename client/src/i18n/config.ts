import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// الترجمات العربية
const arTranslations = {
  common: {
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    home: 'الرئيسية',
    services: 'الخدمات',
    craftsmen: 'الحرفيين',
    about: 'من نحن',
    contact: 'اتصل بنا',
    search: 'بحث',
    filter: 'تصفية',
    profile: 'الملف الشخصي',
    dashboard: 'لوحة التحكم',
    admin: 'الإدارة',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    warning: 'تحذير',
    info: 'معلومات',
    yes: 'نعم',
    no: 'لا',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال',
    reset: 'إعادة تعيين',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'الإنجليزية'
  },
  auth: {
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    phone: 'رقم الهاتف',
    city: 'المدينة',
    district: 'الحي',
    role: 'الدور',
    user: 'مستخدم',
    craftsman: 'حرفي',
    businessName: 'اسم النشاط',
    specializations: 'التخصصات',
    description: 'الوصف',
    loginTitle: 'تسجيل الدخول',
    registerTitle: 'إنشاء حساب جديد',
    forgotPassword: 'نسيت كلمة المرور؟',
    rememberMe: 'تذكرني',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    registerAsCraftsman: 'سجل كحرفي',
    registerAsUser: 'سجل كمستخدم'
  },
  categories: {
    electrical: 'كهرباء',
    plumbing: 'سباكة',
    carpentry: 'نجارة',
    painting: 'دهان',
    airconditioning: 'تكييف وتبريد',
    appliance_repair: 'إصلاح أجهزة',
    masonry: 'بناء وحجارة',
    welding: 'لحام',
    gardening: 'بستنة',
    cleaning: 'تنظيف',
    automotive: 'سيارات',
    electronics: 'إلكترونيات',
    roofing: 'أسطح',
    flooring: 'أرضيات',
    glass: 'زجاج',
    security: 'أمن وحماية',
    other: 'أخرى'
  },
  home: {
    title: 'ابحث عن الحرفي المناسب لك',
    subtitle: 'منصة تربطك بأفضل الحرفيين المتخصصين في منطقتك',
    searchPlaceholder: 'ما الخدمة التي تحتاجها؟',
    howItWorks: 'كيف يعمل الموقع',
    step1Title: 'اطلب الخدمة',
    step1Description: 'اختر نوع الخدمة وأدخل تفاصيل المشكلة',
    step2Title: 'اختر الحرفي',
    step2Description: 'تصفح قائمة الحرفيين واختر الأنسب',
    step3Title: 'احصل على الخدمة',
    step3Description: 'تواصل مع الحرفي وأنجز مهمتك',
    featuredCraftsmen: 'حرفيون مميزون',
    recentReviews: 'آراء العملاء',
    stats: {
      craftsmen: 'حرفي مسجل',
      completedJobs: 'مهمة مكتملة',
      customers: 'عميل راضي',
      cities: 'مدينة'
    }
  },
  services: {
    requestService: 'طلب خدمة',
    title: 'عنوان الطلب',
    category: 'نوع الخدمة',
    urgency: 'الأولوية',
    urgencyLevels: {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية',
      emergency: 'طارئة'
    },
    location: 'الموقع',
    address: 'العنوان',
    schedule: 'الموعد المفضل',
    scheduleTypes: {
      asap: 'في أقرب وقت',
      today: 'اليوم',
      tomorrow: 'غداً',
      this_week: 'هذا الأسبوع',
      specific_date: 'تاريخ محدد'
    },
    budget: 'الميزانية',
    minBudget: 'الحد الأدنى',
    maxBudget: 'الحد الأقصى',
    images: 'صور المشكلة',
    submitRequest: 'إرسال الطلب'
  },
  craftsmen: {
    findCraftsmen: 'ابحث عن حرفيين',
    noCraftsmen: 'لا يوجد حرفيين متاحين',
    viewProfile: 'عرض الملف',
    rating: 'التقييم',
    completedJobs: 'مهام مكتملة',
    yearsExperience: 'سنوات خبرة',
    location: 'الموقع',
    hourlyRate: 'السعر بالساعة',
    availability: 'متاح',
    verified: 'محقق',
    emergencyService: 'خدمة طوارئ',
    contact: 'تواصل',
    portfolio: 'معرض الأعمال',
    reviews: 'التقييمات',
    workingHours: 'ساعات العمل',
    serviceAreas: 'مناطق الخدمة'
  },
  dashboard: {
    welcome: 'مرحباً',
    myRequests: 'طلباتي',
    myProfile: 'ملفي الشخصي',
    settings: 'الإعدادات',
    notifications: 'الإشعارات',
    messages: 'الرسائل',
    earnings: 'الأرباح',
    schedule: 'المواعيد',
    portfolio: 'معرض الأعمال',
    reviews: 'التقييمات'
  },
  admin: {
    users: 'المستخدمين',
    craftsmen: 'الحرفيين',
    requests: 'الطلبات',
    reports: 'التقارير',
    analytics: 'الإحصائيات',
    settings: 'الإعدادات',
    verification: 'التحقق',
    pending: 'في الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض'
  }
};

// الترجمات الإنجليزية
const enTranslations = {
  common: {
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    home: 'Home',
    services: 'Services',
    craftsmen: 'Craftsmen',
    about: 'About',
    contact: 'Contact',
    search: 'Search',
    filter: 'Filter',
    profile: 'Profile',
    dashboard: 'Dashboard',
    admin: 'Admin',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    language: 'Language',
    arabic: 'Arabic',
    english: 'English'
  },
  auth: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone Number',
    city: 'City',
    district: 'District',
    role: 'Role',
    user: 'User',
    craftsman: 'Craftsman',
    businessName: 'Business Name',
    specializations: 'Specializations',
    description: 'Description',
    loginTitle: 'Sign In',
    registerTitle: 'Create New Account',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    registerAsCraftsman: 'Register as Craftsman',
    registerAsUser: 'Register as User'
  },
  categories: {
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    carpentry: 'Carpentry',
    painting: 'Painting',
    airconditioning: 'Air Conditioning',
    appliance_repair: 'Appliance Repair',
    masonry: 'Masonry',
    welding: 'Welding',
    gardening: 'Gardening',
    cleaning: 'Cleaning',
    automotive: 'Automotive',
    electronics: 'Electronics',
    roofing: 'Roofing',
    flooring: 'Flooring',
    glass: 'Glass',
    security: 'Security',
    other: 'Other'
  },
  home: {
    title: 'Find the Right Craftsman for You',
    subtitle: 'A platform that connects you with the best specialized craftsmen in your area',
    searchPlaceholder: 'What service do you need?',
    howItWorks: 'How It Works',
    step1Title: 'Request Service',
    step1Description: 'Choose service type and enter problem details',
    step2Title: 'Choose Craftsman',
    step2Description: 'Browse craftsmen list and choose the best fit',
    step3Title: 'Get Service',
    step3Description: 'Connect with craftsman and complete your task',
    featuredCraftsmen: 'Featured Craftsmen',
    recentReviews: 'Customer Reviews',
    stats: {
      craftsmen: 'Registered Craftsmen',
      completedJobs: 'Completed Jobs',
      customers: 'Happy Customers',
      cities: 'Cities'
    }
  },
  services: {
    requestService: 'Request Service',
    title: 'Request Title',
    category: 'Service Category',
    urgency: 'Priority',
    urgencyLevels: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      emergency: 'Emergency'
    },
    location: 'Location',
    address: 'Address',
    schedule: 'Preferred Schedule',
    scheduleTypes: {
      asap: 'As Soon As Possible',
      today: 'Today',
      tomorrow: 'Tomorrow',
      this_week: 'This Week',
      specific_date: 'Specific Date'
    },
    budget: 'Budget',
    minBudget: 'Minimum',
    maxBudget: 'Maximum',
    images: 'Problem Images',
    submitRequest: 'Submit Request'
  },
  craftsmen: {
    findCraftsmen: 'Find Craftsmen',
    noCraftsmen: 'No craftsmen available',
    viewProfile: 'View Profile',
    rating: 'Rating',
    completedJobs: 'Completed Jobs',
    yearsExperience: 'Years Experience',
    location: 'Location',
    hourlyRate: 'Hourly Rate',
    availability: 'Available',
    verified: 'Verified',
    emergencyService: 'Emergency Service',
    contact: 'Contact',
    portfolio: 'Portfolio',
    reviews: 'Reviews',
    workingHours: 'Working Hours',
    serviceAreas: 'Service Areas'
  },
  dashboard: {
    welcome: 'Welcome',
    myRequests: 'My Requests',
    myProfile: 'My Profile',
    settings: 'Settings',
    notifications: 'Notifications',
    messages: 'Messages',
    earnings: 'Earnings',
    schedule: 'Schedule',
    portfolio: 'Portfolio',
    reviews: 'Reviews'
  },
  admin: {
    users: 'Users',
    craftsmen: 'Craftsmen',
    requests: 'Requests',
    reports: 'Reports',
    analytics: 'Analytics',
    settings: 'Settings',
    verification: 'Verification',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;