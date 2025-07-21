# خبير الحي - Khabeer Al-Hay 🏠🔧

## نظرة عامة | Overview

**خبير الحي** هو تطبيق طموح يربط السكان المحليين بالحرفيين المهرة (كهربائي، سباك، نجار، إلخ) لحل مشاكل المنزل بسرعة وبشكل موثوق.

**Khabeer Al-Hay** is an ambitious application that connects local residents with skilled craftsmen (electricians, plumbers, carpenters, etc.) to solve home problems quickly and reliably.

## المميزات الرئيسية | Key Features

### 🎯 للعملاء | For Clients
- 📱 طلب خدمة سريع مع الصور والوصف
- 📍 تحديد الموقع الجغرافي التلقائي
- 💰 مقارنة العروض من الحرفيين المختلفين
- 💬 دردشة مباشرة مع الحرفي
- ⭐ تقييم الخدمة والحرفي
- 📄 فاتورة PDF تلقائية

### 🔧 للحرفيين | For Craftsmen
- 🔔 إشعارات فورية للطلبات القريبة
- 💼 لوحة تحكم لإدارة الطلبات
- 📊 إحصائيات الأرباح والتقييمات
- 🕒 إدارة الوقت والتوفر
- 🏆 نظام التقييمات والسمعة

### 🛡️ الأمان والجودة | Security & Quality
- ✅ التحقق من هوية الحرفيين
- 🔒 دفع آمن ومرن
- 📞 دعم فني متاح 24/7
- 🛡️ ضمان على الخدمات

## الهندسة المعمارية | Architecture

### 🔧 الخادم | Backend
- **Framework**: Node.js + NestJS
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + Passport
- **Real-time**: WebSocket/Socket.IO
- **File Storage**: AWS S3 / Firebase Storage

### 📱 التطبيق | Mobile App
- **Framework**: Flutter 3.x
- **State Management**: Riverpod
- **Navigation**: GoRouter
- **Maps**: Google Maps
- **Notifications**: Firebase Cloud Messaging
- **Storage**: Hive + SharedPreferences

### ⚙️ DevOps & Deployment
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: Railway/Render (MVP), AWS (Production)
- **Monitoring**: Sentry + Prometheus

## هيكل المشروع | Project Structure

```
khabeer-al-hay/
├── backend-api/                 # NestJS Backend API
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── specialties/        # Craftsman specialties
│   │   ├── requests/           # Service requests
│   │   ├── offers/             # Price offers
│   │   ├── chat/               # Real-time messaging
│   │   ├── ratings/            # Rating system
│   │   ├── payments/           # Payment processing
│   │   └── common/             # Shared utilities
│   ├── prisma/                 # Database schema
│   └── package.json
├── mobile-app/                 # Flutter Mobile App
│   ├── lib/
│   │   ├── screens/            # UI Screens
│   │   ├── widgets/            # Reusable widgets
│   │   ├── services/           # API services
│   │   ├── models/             # Data models
│   │   ├── providers/          # State management
│   │   └── utils/              # Helper functions
│   └── pubspec.yaml
├── docs/                       # Documentation
├── deployment/                 # Deployment configs
└── README.md
```

## قاعدة البيانات | Database Schema

### الجداول الرئيسية | Main Tables
- **users**: المستخدمين (عملاء وحرفيين)
- **specialties**: التخصصات (كهرباء، سباكة، إلخ)
- **service_requests**: طلبات الخدمة
- **offers**: عروض الأسعار
- **chats**: المحادثات
- **ratings**: التقييمات
- **payments**: المدفوعات

## التثبيت والتشغيل | Installation & Setup

### متطلبات النظام | Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Flutter 3.0+
- Docker (optional)

### 1. إعداد الخادم | Backend Setup

```bash
cd backend-api
npm install
cp .env.example .env
# تحديث متغيرات البيئة | Update environment variables
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

### 2. إعداد التطبيق | Mobile App Setup

```bash
cd mobile-app
flutter pub get
flutter run
```

### 3. إعداد قاعدة البيانات | Database Setup

```bash
# إنشاء قاعدة البيانات
createdb khabeer_al_hay

# تشغيل المايجريشن
npx prisma migrate dev

# إضافة البيانات الأساسية
npm run seed
```

## API Documentation

### GraphQL Playground
عند تشغيل الخادم، يمكنك الوصول إلى GraphQL Playground على:
```
http://localhost:3000/graphql
```

### أمثلة على الاستعلامات | Query Examples

#### تسجيل مستخدم جديد | Register User
```graphql
mutation {
  register(input: {
    email: "user@example.com"
    phone: "+966501234567"
    password: "123456"
    firstName: "أحمد"
    lastName: "محمد"
    userType: CLIENT
  }) {
    token
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

#### إنشاء طلب خدمة | Create Service Request
```graphql
mutation {
  createRequest(input: {
    title: "إصلاح مشكلة كهربائية"
    description: "انقطاع في الكهرباء في غرفة النوم"
    specialtyId: "specialty-id"
    latitude: 24.7136
    longitude: 46.6753
    address: "الرياض، المملكة العربية السعودية"
  }) {
    id
    title
    status
  }
}
```

## خريطة التطوير | Development Roadmap

### المرحلة الأولى (MVP) - 12 أسبوع | Phase 1 (MVP) - 12 Weeks

#### الأسابيع 1-2: التصميم والإعداد
- [x] تصميم UI/UX
- [x] إعداد المستودعات
- [x] تصميم قاعدة البيانات
- [x] إعداد بيئة التطوير

#### الأسابيع 3-4: المصادقة والمستخدمين
- [x] نظام تسجيل الدخول/التسجيل
- [x] إدارة ملفات المستخدمين
- [x] نظام التخصصات

#### الأسابيع 5-6: الطلبات والعروض
- [ ] إنشاء طلبات الخدمة
- [ ] نظام العروض
- [ ] قبول/رفض العروض

#### الأسابيع 7-8: الخرائط والموقع
- [ ] تكامل خرائط Google
- [ ] تحديد الموقع التلقائي
- [ ] البحث بناء على الموقع

#### الأسابيع 9-10: المحادثة والإشعارات
- [ ] نظام المحادثة الفورية
- [ ] إشعارات push
- [ ] تتبع حالة الطلب

#### الأسابيع 11-12: الاختبار والإطلاق
- [ ] اختبار شامل
- [ ] إصلاح الأخطاء
- [ ] إطلاق نسخة تجريبية

### المرحلة الثانية: التحسينات | Phase 2: Enhancements
- [ ] نظام الدفع الإلكتروني
- [ ] تقييمات متقدمة
- [ ] إحصائيات وتحليلات
- [ ] دعم متعدد اللغات

### المرحلة الثالثة: التوسع | Phase 3: Expansion
- [ ] اشتراكات شهرية
- [ ] نظام الولاء
- [ ] تأمين الخدمات
- [ ] ذكاء اصطناعي للتوصيات

## المساهمة | Contributing

نرحب بالمساهمات من المطورين! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى البرانش (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الاتصال | Contact

- **البريد الإلكتروني**: info@khabeeralhay.com
- **الموقع**: https://khabeeralhay.com
- **تويتر**: @KhabeerAlHay

## شكر خاص | Acknowledgments

- فريق Flutter للإطار الرائع
- فريق NestJS للخادم القوي
- مجتمع المطورين العرب

---

**جعل الصيانة المنزلية أسهل، خطوة واحدة في كل مرة** 🏠✨