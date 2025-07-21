# دليل التطوير | Development Guide

## إعداد بيئة التطوير | Development Environment Setup

### المتطلبات الأساسية | Prerequisites

#### للخادم | Backend Requirements
- **Node.js**: v18.0.0 أو أحدث
- **npm**: v9.0.0 أو أحدث  
- **PostgreSQL**: v14.0 أو أحدث
- **Redis**: v7.0 أو أحدث (اختياري)
- **Docker**: v20.0 أو أحدث (اختياري)

#### للتطبيق المحمول | Mobile App Requirements
- **Flutter**: v3.0.0 أو أحدث
- **Dart**: v3.0.0 أو أحدث
- **Android Studio** أو **VS Code** مع إضافات Flutter
- **Android SDK** (للأندرويد)
- **Xcode** (للـ iOS - macOS فقط)

### الخطوة 1: استنساخ المشروع | Clone the Project

```bash
git clone https://github.com/your-org/khabeer-al-hay.git
cd khabeer-al-hay
```

### الخطوة 2: إعداد قاعدة البيانات | Database Setup

#### استخدام PostgreSQL المحلي | Local PostgreSQL
```bash
# إنشاء قاعدة البيانات
createdb khabeer_al_hay

# أو باستخدام psql
psql -U postgres
CREATE DATABASE khabeer_al_hay;
\q
```

#### استخدام Docker | Using Docker
```bash
docker run --name khabeer-postgres \
  -e POSTGRES_DB=khabeer_al_hay \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### الخطوة 3: إعداد الخادم | Backend Setup

```bash
cd backend-api

# تثبيت التبعيات
npm install

# نسخ ملف البيئة
cp .env.example .env

# تحرير متغيرات البيئة
nano .env
```

#### تحديث ملف `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/khabeer_al_hay?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

#### تشغيل المايجريشن وإنشاء البيانات الأساسية:
```bash
# إنشاء وتشغيل المايجريشن
npx prisma migrate dev --name init

# إنشاء Prisma Client
npx prisma generate

# إضافة البيانات الأساسية (التخصصات)
npm run seed
```

#### تشغيل الخادم:
```bash
# وضع التطوير (مع إعادة التشغيل التلقائي)
npm run start:dev

# أو الوضع العادي
npm start
```

الخادم سيعمل على: http://localhost:3000
GraphQL Playground: http://localhost:3000/graphql

### الخطوة 4: إعداد التطبيق المحمول | Mobile App Setup

```bash
cd mobile-app

# تثبيت التبعيات
flutter pub get

# تشغيل مولدات الكود (إذا لزم الأمر)
flutter packages pub run build_runner build

# تشغيل التطبيق
flutter run
```

### الخطوة 5: إعداد Docker (اختياري) | Docker Setup (Optional)

```bash
# تشغيل جميع الخدمات
docker-compose up -d

# تشغيل الخدمات الأساسية فقط (قاعدة البيانات و Redis)
docker-compose up -d postgres redis

# عرض سجلات الخدمات
docker-compose logs -f

# إيقاف الخدمات
docker-compose down
```

## هيكل المشروع | Project Structure

### الخادم | Backend Structure
```
backend-api/
├── src/
│   ├── auth/                   # نظام المصادقة
│   │   ├── auth.service.ts
│   │   ├── auth.resolver.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   └── strategies/
│   ├── users/                  # إدارة المستخدمين
│   ├── specialties/            # التخصصات
│   ├── requests/               # طلبات الخدمة
│   ├── offers/                 # العروض
│   ├── chat/                   # نظام المحادثة
│   ├── ratings/                # التقييمات
│   ├── payments/               # المدفوعات
│   ├── common/                 # الأدوات المشتركة
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── pipes/
│   ├── config/                 # إعدادات التطبيق
│   ├── main.ts
│   └── app.module.ts
├── prisma/
│   ├── schema.prisma           # مخطط قاعدة البيانات
│   └── migrations/
├── test/                       # الاختبارات
├── package.json
└── Dockerfile
```

### التطبيق المحمول | Mobile App Structure
```
mobile-app/
├── lib/
│   ├── screens/                # شاشات التطبيق
│   │   ├── auth/
│   │   ├── home/
│   │   ├── map/
│   │   ├── requests/
│   │   ├── chat/
│   │   └── profile/
│   ├── widgets/                # العناصر المعاد استخدامها
│   ├── services/               # خدمات API
│   ├── models/                 # نماذج البيانات
│   ├── providers/              # إدارة الحالة (Riverpod)
│   ├── utils/                  # الوظائف المساعدة
│   └── main.dart
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── android/
├── ios/
└── pubspec.yaml
```

## إرشادات التطوير | Development Guidelines

### معايير الكود | Code Standards

#### للخادم (TypeScript/NestJS) | Backend (TypeScript/NestJS)
- استخدم **PascalCase** للكلاسات والواجهات
- استخدم **camelCase** للمتغيرات والوظائف
- استخدم **kebab-case** لأسماء الملفات
- أضف تعليقات JSDoc للوظائف العامة
- استخدم TypeScript بدقة (strict mode)

```typescript
// مثال على كلاس Service
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * البحث عن مستخدم بالمعرف
   * @param id معرف المستخدم
   * @returns بيانات المستخدم أو null
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
```

#### للتطبيق المحمول (Dart/Flutter) | Mobile App (Dart/Flutter)
- استخدم **PascalCase** للكلاسات
- استخدم **camelCase** للمتغيرات والوظائف
- استخدم **snake_case** لأسماء الملفات
- اتبع إرشادات Dart الرسمية
- استخدم `const` كلما أمكن

```dart
// مثال على شاشة Flutter
class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('الصفحة الرئيسية'),
      ),
      body: const Center(
        child: Text('مرحباً بك في خبير الحي'),
      ),
    );
  }
}
```

### إدارة قاعدة البيانات | Database Management

#### إضافة جدول جديد | Adding New Table
1. تحديث `prisma/schema.prisma`
2. إنشاء مايجريشن جديد:
```bash
npx prisma migrate dev --name add_new_table
```
3. إنشاء Prisma Client جديد:
```bash
npx prisma generate
```

#### تحديث جدول موجود | Updating Existing Table
```bash
# بعد تحديث schema.prisma
npx prisma migrate dev --name update_table_name
```

#### إعادة تعيين قاعدة البيانات | Reset Database
```bash
npx prisma migrate reset
```

### الاختبارات | Testing

#### اختبارات الخادم | Backend Tests
```bash
# اختبارات الوحدة
npm run test

# اختبارات التكامل
npm run test:e2e

# تغطية الكود
npm run test:cov

# اختبار ملف محدد
npm run test -- users.service.spec.ts
```

#### اختبارات التطبيق المحمول | Mobile App Tests
```bash
# اختبارات الوحدة
flutter test

# اختبارات التكامل
flutter test integration_test/

# اختبارات العناصر المرئية
flutter test --coverage
```

### إدارة الحالة | State Management

#### Riverpod Providers
```dart
// Provider للبيانات البسيطة
final counterProvider = StateProvider<int>((ref) => 0);

// Provider للبيانات المعقدة
final userProvider = StateNotifierProvider<UserNotifier, User?>((ref) {
  return UserNotifier();
});

// Provider للخدمات
final apiServiceProvider = Provider<ApiService>((ref) {
  return ApiService();
});
```

### التعامل مع الأخطاء | Error Handling

#### في الخادم | Backend Error Handling
```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

#### في التطبيق المحمول | Mobile App Error Handling
```dart
class ApiService {
  Future<T> handleRequest<T>(Future<T> Function() request) async {
    try {
      return await request();
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        // إعادة توجيه لصفحة تسجيل الدخول
        throw UnauthorizedException();
      }
      throw ApiException(e.message ?? 'خطأ في الشبكة');
    }
  }
}
```

## أدوات مفيدة | Useful Tools

### أدوات الخادم | Backend Tools
- **Prisma Studio**: `npx prisma studio` - واجهة مرئية لقاعدة البيانات
- **GraphQL Playground**: http://localhost:3000/graphql
- **Postman/Insomnia**: لاختبار API
- **Docker Desktop**: لإدارة الحاويات

### أدوات التطبيق المحمول | Mobile App Tools
- **Flutter Inspector**: في VS Code أو Android Studio
- **Flutter DevTools**: أدوات تطوير متقدمة
- **Flipper**: لتتبع الشبكة والتخزين المحلي

## حل المشاكل الشائعة | Troubleshooting

### مشاكل قاعدة البيانات | Database Issues

#### خطأ في الاتصال بقاعدة البيانات:
```bash
# تحقق من تشغيل PostgreSQL
sudo systemctl status postgresql

# إعادة تشغيل PostgreSQL
sudo systemctl restart postgresql
```

#### مشاكل في المايجريشن:
```bash
# إعادة تعيين المايجريشن
npx prisma migrate reset

# إصلاح مشاكل المخطط
npx prisma db push --force-reset
```

### مشاكل Flutter | Flutter Issues

#### مشاكل التبعيات:
```bash
# تنظيف وإعادة تثبيت التبعيات
flutter clean
flutter pub get

# إعادة إنشاء الملفات المولدة
flutter packages pub run build_runner clean
flutter packages pub run build_runner build --delete-conflicting-outputs
```

#### مشاكل الجهاز المحاكي:
```bash
# عرض الأجهزة المتاحة
flutter devices

# تشغيل على جهاز محدد
flutter run -d <device-id>
```

### مشاكل Docker | Docker Issues

#### مسح الحاويات والصور:
```bash
# إيقاف جميع الحاويات
docker stop $(docker ps -aq)

# مسح جميع الحاويات
docker rm $(docker ps -aq)

# مسح الصور غير المستخدمة
docker system prune -a
```

## المساهمة | Contributing

### سير العمل | Workflow
1. إنشاء branch جديد من `develop`
2. تطوير الميزة أو إصلاح الخطأ
3. كتابة الاختبارات
4. تشغيل جميع الاختبارات
5. إنشاء Pull Request

### معايير Pull Request
- وصف واضح للتغييرات
- اختبارات شاملة
- توثيق للميزات الجديدة
- مراجعة الكود من عضوين على الأقل

### رسائل Commit
استخدم التنسيق التالي:
```
نوع: وصف مختصر

وصف تفصيلي إذا لزم الأمر

Closes #123
```

أنواع Commit:
- `feat`: ميزة جديدة
- `fix`: إصلاح خطأ
- `docs`: تحديث التوثيق
- `style`: تغييرات التنسيق
- `refactor`: إعادة هيكلة الكود
- `test`: إضافة اختبارات
- `chore`: مهام صيانة

---

للمساعدة أو الاستفسارات، يرجى فتح issue في GitHub أو التواصل مع فريق التطوير.