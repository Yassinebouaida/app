# خبير الحي - تطبيق الصيانة المنزلية الذكي | Khabeer Al-Hay - Smart Home Maintenance App

[![NestJS](https://img.shields.io/badge/NestJS-8.0.0-red.svg)](https://nestjs.com/)
[![Flutter](https://img.shields.io/badge/Flutter-3.16.0-blue.svg)](https://flutter.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-green.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Documentation](https://img.shields.io/badge/Documentation-Complete-brightgreen.svg)](docs/)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](CHANGELOG.md)
[![Roadmap](https://img.shields.io/badge/Roadmap-Active-orange.svg)](ROADMAP.md)

## 🎯 نظرة عامة | Overview

**خبير الحي** هو تطبيق شامل للصيانة المنزلية يربط السكان المحليين بالحرفيين المهرة. يوفر التطبيق واجهة سهلة الاستخدام لطلب خدمات الصيانة، مع نظام تقييمات شامل وإدارة مدفوعات آمنة.

**Khabeer Al-Hay** is a comprehensive home maintenance application that connects local residents with skilled craftsmen. The app provides an easy-to-use interface for requesting maintenance services, with a comprehensive rating system and secure payment management.

### 🌟 المميزات الرئيسية | Key Features

- 🏠 **خدمات صيانة شاملة** - كهرباء، سباكة، نجارة، صيانة عامة
- 👥 **حرفيون معتمدون** - نظام تصنيف وتقييم متطور
- 📍 **خدمة محلية** - البحث عن الحرفيين في منطقتك
- 💰 **أسعار شفافة** - عروض أسعار واضحة ومقارنة
- 💬 **تواصل مباشر** - محادثة فورية مع الحرفيين
- ⭐ **نظام تقييمات** - تقييمات ومراجعات من العملاء
- 💳 **مدفوعات آمنة** - طرق دفع متعددة وآمنة
- 📱 **تطبيق متعدد المنصات** - Android، iOS، ويب
- 🛡️ **أمان متقدم** - مصادقة JWT وحماية شاملة
- 🎨 **واجهة عربية** - دعم RTL كامل مع تصميم عصري

## 🏗️ البنية التقنية | Technical Architecture

### Backend Stack
- **Framework**: NestJS 10.x
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL 15.x
- **ORM**: Prisma 5.x
- **Authentication**: JWT + Passport
- **Real-time**: Socket.IO
- **Validation**: Class-validator
- **Testing**: Jest + Supertest

### Mobile App Stack
- **Framework**: Flutter 3.16.x
- **State Management**: Riverpod
- **Navigation**: GoRouter
- **Maps**: Google Maps API
- **Notifications**: Firebase Cloud Messaging
- **Storage**: Hive + SharedPreferences
- **RTL Support**: Full Arabic support

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Caching**: Redis
- **Monitoring**: Prometheus + Grafana
- **CI/CD**: GitHub Actions
- **SSL**: Let's Encrypt

## 🚀 التشغيل السريع | Quick Start

### المتطلبات | Prerequisites
- Docker & Docker Compose
- Git
- Node.js 18+ (للتطوير المحلي)
- Flutter 3.16+ (للتطوير المحلي)

### 1. استنساخ المشروع | Clone Repository
```bash
git clone <repository-url>
cd khabeer-al-hay
```

### 2. التشغيل التلقائي | Auto Start
```bash
# منح صلاحيات التنفيذ
chmod +x start.sh

# تشغيل جميع الخدمات
./start.sh start
```

### 3. أو باستخدام Makefile | Or Using Makefile
```bash
# تشغيل سريع للتطوير
make dev

# أو الأوامر الفردية
make start
make setup-db
```

### 4. الوصول للتطبيقات | Access Applications
- **Backend API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql
- **Mobile Web App**: http://localhost:8080
- **Admin Dashboard**: http://localhost:3001
- **Grafana Monitoring**: http://localhost:3002

### 5. بيانات الدخول الافتراضية | Default Credentials
- **Admin**: admin@khabeer-al-hay.com / admin123
- **Craftsman**: ahmed.electrician@example.com / craftsman123
- **Client**: client@example.com / client123

## 📱 استخدام التطبيق | Using the App

### للعملاء | For Clients
1. **إنشاء حساب** - تسجيل بياناتك الشخصية
2. **طلب خدمة** - اختر نوع الخدمة وحدد موقعك
3. **مقارنة العروض** - استقبل عروض أسعار من الحرفيين
4. **اختيار الحرفي** - اختر أفضل عرض
5. **متابعة العمل** - تابع تقدم العمل
6. **تقييم الخدمة** - قيم جودة العمل

### للحرفيين | For Craftsmen
1. **إنشاء ملف شخصي** - أضف تخصصاتك وخبراتك
2. **استقبال الطلبات** - تصفح طلبات الخدمة في منطقتك
3. **تقديم عروض** - أرسل عروض أسعار للعملاء
4. **تنفيذ العمل** - نفذ الخدمة المطلوبة
5. **استلام الدفع** - احصل على أجرك
6. **بناء السمعة** - احصل على تقييمات إيجابية

### للإدارة | For Administrators
1. **مراقبة النظام** - تتبع جميع العمليات
2. **إدارة المستخدمين** - الموافقة على الحرفيين الجدد
3. **مراقبة الطلبات** - متابعة حالة جميع الطلبات
4. **إدارة المدفوعات** - مراقبة المعاملات المالية
5. **تحليل الأداء** - تقارير وإحصائيات شاملة

## 🛠️ التطوير | Development

### إعداد البيئة المحلية | Local Development Setup
```bash
# Backend
cd backend-api
npm install
npx prisma migrate dev
npm run start:dev

# Mobile App
cd mobile-app
flutter pub get
flutter run
```

### الاختبار | Testing
```bash
# Backend Tests
cd backend-api
npm run test
npm run test:e2e

# Mobile App Tests
cd mobile-app
flutter test
```

### بناء المشروع | Building
```bash
# Backend Build
cd backend-api
npm run build

# Mobile App Build
cd mobile-app
flutter build apk --release
flutter build ios --release
```

## 📊 المراقبة والتحليل | Monitoring & Analytics

### Prometheus Metrics
- معدل الطلبات في الثانية
- وقت الاستجابة
- معدل الأخطاء
- استخدام الموارد

### Grafana Dashboards
- لوحة تحكم الأداء
- تحليل المستخدمين
- تقارير المبيعات
- صحة النظام

### Health Checks
- حالة الخدمات
- اتصال قاعدة البيانات
- استخدام الذاكرة
- مساحة التخزين

## 🔒 الأمان | Security

- **مصادقة JWT متطورة** - جلسات آمنة
- **تشفير HTTPS** - حماية البيانات
- **Rate Limiting** - حماية من الهجمات
- **Input Validation** - التحقق من صحة البيانات
- **Admin Guards** - حماية لوحة الإدارة
- **CORS Configuration** - إعدادات أمان متقدمة

## 📚 التوثيق | Documentation

### 📖 دليل شامل | Comprehensive Guide
- **[📚 دليل التوثيق](docs/)** - نظرة عامة على جميع الوثائق
- **[🛠️ دليل التطوير](docs/DEVELOPMENT.md)** - للمطورين
- **[👥 دليل المستخدم](docs/USER_GUIDE.md)** - للمستخدمين
- **[❓ الأسئلة الشائعة](docs/FAQ.md)** - حلول للمشاكل
- **[🆘 دليل الدعم](docs/SUPPORT.md)** - كيفية الحصول على المساعدة

### 📋 ملفات المشروع | Project Files
- **[📄 ملخص المشروع](PROJECT_SUMMARY.md)** - نظرة تقنية شاملة
- **[📝 سجل التغييرات](CHANGELOG.md)** - تتبع التحديثات
- **[🗺️ خريطة الطريق](ROADMAP.md)** - خطة التطوير المستقبلية
- **[🤝 دليل المساهمة](CONTRIBUTING.md)** - للمطورين الجدد
- **[📄 الترخيص](LICENSE)** - رخصة MIT

### 🔍 البحث في التوثيق | Search Documentation
```bash
# البحث في جميع ملفات التوثيق
grep -r "كلمة البحث" . --include="*.md"

# البحث في مجلد docs
grep -r "كلمة البحث" docs/

# البحث في ملف محدد
grep "كلمة البحث" docs/USER_GUIDE.md
```

## 🚀 النشر | Deployment

### إعداد الإنتاج | Production Setup
```bash
# بناء الصور
make build

# نشر الإنتاج
make deploy

# مراقبة النظام
make monitor
```

### متغيرات البيئة | Environment Variables
```bash
# نسخ ملف البيئة
cp .env.example .env

# تعديل المتغيرات حسب البيئة
nano .env
```

## 🤝 المساهمة | Contributing

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للبدء.

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### 🚀 كيفية المساهمة | How to Contribute
1. **اقرأ التوثيق** - ابدأ بـ [دليل التطوير](docs/DEVELOPMENT.md)
2. **اختر مهمة** - راجع [Issues](../../issues) أو اقترح ميزة جديدة
3. **أنشئ فرع** - اتبع [دليل المساهمة](CONTRIBUTING.md)
4. **أرسل PR** - نرحب بمراجعة كودك

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT. راجع ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 الدعم | Support

- **📧 البريد الإلكتروني**: support@khabeer-al-hay.com
- **💬 الدردشة المباشرة**: متاحة في التطبيق
- **📱 الهاتف**: +966-XX-XXX-XXXX
- **🌐 الموقع**: https://khabeer-al-hay.com

### 🆘 الحصول على المساعدة | Getting Help
1. **راجع [FAQ](docs/FAQ.md)** - قد تجد إجابة سريعة
2. **راجع [دليل الدعم](docs/SUPPORT.md)** - تعرف على طرق الحصول على المساعدة
3. **أنشئ [Issue جديد](../../issues/new)** - اطرح سؤالك أو اقترح تحسيناً

## 🏆 الفريق | Team

- **المطور الرئيسي**: فريق خبير الحي
- **المصمم**: فريق التصميم
- **المدير التقني**: فريق التقنية

## 📊 إحصائيات المشروع | Project Statistics

- **📁 إجمالي الملفات**: 80+ ملف
- **💻 أسطر الكود**: 5000+ سطر
- **🔧 تبعيات الخادم**: 30+ حزمة
- **📱 تبعيات التطبيق**: 40+ حزمة
- **🗃️ جداول قاعدة البيانات**: 9 جداول
- **🌐 GraphQL Resolvers**: 20+ resolver
- **📱 شاشات التطبيق**: 15+ شاشة
- **📚 ملفات التوثيق**: 10+ ملف
- **🐳 ملفات Docker**: 5+ ملف
- **🔧 أدوات التطوير**: 3+ أداة

## 🔮 المستقبل | Future

### 🎯 الخطط القادمة | Upcoming Plans
- **الإصدار 2.1.0** - نظام دفع إلكتروني متكامل
- **الإصدار 2.2.0** - دعم متعدد اللغات
- **الإصدار 3.0.0** - ذكاء اصطناعي للتوصيات

### 🗺️ خريطة الطريق | Roadmap
راجع [خريطة الطريق](ROADMAP.md) للحصول على تفاصيل شاملة عن خطط التطوير المستقبلية.

Check our [Roadmap](ROADMAP.md) for comprehensive details about future development plans.

---

## 🎉 الخلاصة | Conclusion

**خبير الحي** هو تطبيق شامل ومتطور للصيانة المنزلية، مصمم ليكون الحل الأمثل لربط العملاء بالحرفيين المهرة. مع واجهة مستخدم عربية جميلة، نظام تقييمات شامل، وإدارة مدفوعات آمنة، يوفر التطبيق تجربة مستخدم فريدة ومتكاملة.

**Khabeer Al-Hay** is a comprehensive and advanced home maintenance application, designed to be the ultimate solution for connecting clients with skilled craftsmen. With a beautiful Arabic user interface, comprehensive rating system, and secure payment management, the app provides a unique and integrated user experience.

**"جعل الصيانة المنزلية أسهل، خطوة واحدة في كل مرة"** 🏠✨

**"Making home maintenance easier, one step at a time"** 🏠✨

---

<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Status: Production Ready">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version: 2.0.0">
  <img src="https://img.shields.io/badge/Last%20Update-2024-blue" alt="Last Update: 2024">
  <img src="https://img.shields.io/badge/Documentation-Complete-brightgreen" alt="Documentation: Complete">
  <img src="https://img.shields.io/badge/Roadmap-Active-orange" alt="Roadmap: Active">
</div>