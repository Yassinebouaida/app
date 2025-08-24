# 🤝 دليل المساهمة | Contributing Guide

شكراً لك على اهتمامك بالمساهمة في مشروع **خبير الحي**! 🎉

Thank you for your interest in contributing to the **Khabeer Al-Hay** project! 🎉

## 📋 جدول المحتويات | Table of Contents

- [🎯 نظرة عامة](#-نظرة-عامة--overview)
- [🚀 كيفية البدء](#-كيفية-البدء--getting-started)
- [📝 أنواع المساهمات](#-أنواع-المساهمات--types-of-contributions)
- [🏗️ هيكل المشروع](#️-هيكل-المشروع--project-structure)
- [📋 معايير الكود](#-معايير-الكود--code-standards)
- [🧪 الاختبار](#-الاختبار--testing)
- [🔄 سير العمل](#-سير-العمل--workflow)
- [❌ ما يجب تجنبه](#-ما-يجب-تجنبه--what-to-avoid)
- [🎯 أولويات التطوير](#-أولويات-التطوير--development-priorities)
- [💬 قنوات التواصل](#-قنوات-التواصل--communication-channels)
- [🏆 الاعتراف](#-الاعتراف--recognition)
- [📚 موارد مفيدة](#-موارد-مفيدة--useful-resources)

## 🎯 نظرة عامة | Overview

**خبير الحي** هو مشروع مفتوح المصدر يهدف إلى ربط العملاء بالحرفيين المهرة من خلال تطبيق ذكي وشامل. نرحب بجميع أنواع المساهمات من المطورين والمصممين والمختبرين والمستخدمين.

**Khabeer Al-Hay** is an open-source project that aims to connect clients with skilled craftsmen through a smart and comprehensive application. We welcome all types of contributions from developers, designers, testers, and users.

### 🌟 قيمنا | Our Values

- **الشفافية** - نؤمن بالشفافية في جميع العمليات
- **الجودة** - نسعى للتميز في كل ما نقدمه
- **التعاون** - نعزز روح الفريق والتعاون
- **الابتكار** - نشجع الأفكار الجديدة والإبداع
- **الشمولية** - نرحب بالجميع بغض النظر عن الخلفية

## 🚀 كيفية البدء | Getting Started

### 1. إعداد البيئة | Environment Setup

```bash
# استنساخ المشروع
git clone https://github.com/your-username/khabeer-al-hay.git
cd khabeer-al-hay

# منح صلاحيات التنفيذ
chmod +x start.sh

# تشغيل البيئة
./start.sh start
```

### 2. التعرف على المشروع | Project Familiarization

- اقرأ [README.md](README.md) لفهم المشروع
- راجع [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) للحصول على نظرة عامة
- استكشف [docs/](docs/) للتوثيق التفصيلي
- جرب التطبيق على http://localhost:8080

### 3. اختيار المهمة | Choosing a Task

- راجع [Issues](../../issues) للعثور على مهام متاحة
- ابحث عن issues مُوسمة بـ `good first issue` للمبتدئين
- أو اقترح ميزة جديدة من خلال إنشاء issue

## 📝 أنواع المساهمات | Types of Contributions

### 💻 تطوير الكود | Code Development

- **إصلاح الأخطاء** - حل المشاكل الموجودة
- **إضافة ميزات** - تطوير ميزات جديدة
- **تحسين الأداء** - تحسين سرعة وكفاءة التطبيق
- **تحسين الأمان** - تعزيز حماية التطبيق
- **تحسين الواجهة** - تحسين تجربة المستخدم

### 🎨 التصميم | Design

- **تصميم الواجهة** - تحسين UI/UX
- **تصميم الأيقونات** - إنشاء أيقونات جديدة
- **تصميم الشعارات** - تطوير هوية بصرية
- **تصميم الرسوم** - إنشاء رسوم توضيحية

### 📚 التوثيق | Documentation

- **كتابة الدليل** - تحسين التوثيق الموجود
- **ترجمة المحتوى** - ترجمة للغات أخرى
- **إنشاء أمثلة** - أمثلة عملية للاستخدام
- **كتابة الدروس** - دروس تعليمية للمطورين

### 🧪 الاختبار | Testing

- **اختبار الوحدة** - كتابة اختبارات للكود
- **اختبار التكامل** - اختبار التفاعل بين المكونات
- **اختبار المستخدم** - اختبار تجربة المستخدم
- **اختبار الأداء** - اختبار سرعة التطبيق

### 🐛 الإبلاغ عن الأخطاء | Bug Reporting

- **تحديد المشاكل** - العثور على الأخطاء
- **توثيق الأخطاء** - كتابة تقارير مفصلة
- **إعادة إنتاج الأخطاء** - خطوات لإعادة المشكلة
- **اقتراح الحلول** - أفكار لحل المشاكل

## 🏗️ هيكل المشروع | Project Structure

```
khabeer-al-hay/
├── 🔧 backend-api/          # خادم NestJS API
│   ├── src/
│   │   ├── auth/            # نظام المصادقة
│   │   ├── users/           # إدارة المستخدمين
│   │   ├── specialties/     # التخصصات
│   │   ├── requests/        # إدارة الطلبات
│   │   ├── offers/          # نظام العروض
│   │   ├── chat/            # نظام المحادثة
│   │   ├── ratings/         # نظام التقييمات
│   │   ├── payments/        # معالجة المدفوعات
│   │   ├── admin/           # لوحة الإدارة
│   │   └── common/          # الأدوات المشتركة
│   └── prisma/              # مخطط قاعدة البيانات
├── 📱 mobile-app/           # تطبيق Flutter
│   ├── lib/
│   │   ├── screens/         # شاشات التطبيق
│   │   ├── widgets/         # عناصر معاد استخدامها
│   │   ├── services/        # خدمات API
│   │   ├── models/          # نماذج البيانات
│   │   └── providers/       # إدارة الحالة
├── 📚 docs/                 # التوثيق
├── 🐳 docker-compose.yml    # إعداد Docker
└── 🚀 start.sh              # سكريبت التشغيل
```

## 📋 معايير الكود | Code Standards

### Backend (NestJS + TypeScript)

#### التسمية | Naming Conventions
```typescript
// الملفات: kebab-case
user-profile.service.ts
service-request.resolver.ts

// الكلاسات: PascalCase
export class UserProfileService {}
export class ServiceRequestResolver {}

// المتغيرات والدوال: camelCase
const userProfile = await this.getUserProfile();
async getUserProfile(): Promise<UserProfile> {}

// الثوابت: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;
```

#### الهيكلة | Structure
```typescript
// ترتيب الاستيرادات
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserProfileService } from './user-profile.service';

// ترتيب الكلاس
@Injectable()
export class UserProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // الخصائص العامة أولاً
  async getUserProfile(userId: string): Promise<UserProfile> {
    // التنفيذ
  }

  // الخصائص الخاصة في النهاية
  private validateUserData(data: any): boolean {
    // التحقق
  }
}
```

#### التعليقات | Comments
```typescript
/**
 * خدمة إدارة الملفات الشخصية للمستخدمين
 * تتعامل مع إنشاء وتحديث وعرض الملفات الشخصية
 */
@Injectable()
export class UserProfileService {
  /**
   * الحصول على الملف الشخصي للمستخدم
   * @param userId معرف المستخدم
   * @returns الملف الشخصي أو null إذا لم يتم العثور عليه
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    // التحقق من وجود المستخدم
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    // إرجاع الملف الشخصي
    return user.profile;
  }
}
```

### Mobile App (Flutter + Dart)

#### التسمية | Naming Conventions
```dart
// الملفات: snake_case
user_profile_screen.dart
service_request_service.dart

// الكلاسات: PascalCase
class UserProfileScreen extends StatelessWidget {}
class ServiceRequestService {}

// المتغيرات والدوال: camelCase
final userProfile = await getUserProfile();
Future<UserProfile> getUserProfile() async {}

// الثوابت: lowerCamelCase
const maxRetryAttempts = 3;
const defaultPageSize = 20;
```

#### الهيكلة | Structure
```dart
class UserProfileScreen extends StatelessWidget {
  const UserProfileScreen({
    super.key,
    required this.userId,
  });

  final String userId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: const Text('الملف الشخصي'),
    );
  }

  Widget _buildBody() {
    return Consumer(
      builder: (context, ref, child) {
        final userProfileAsync = ref.watch(userProfileProvider(userId));
        
        return userProfileAsync.when(
          data: (profile) => _buildProfileContent(profile),
          loading: () => const CircularProgressIndicator(),
          error: (error, stack) => _buildErrorWidget(error),
        );
      },
    );
  }
}
```

## 🧪 الاختبار | Testing

### Backend Testing

#### اختبار الوحدة | Unit Tests
```typescript
describe('UserProfileService', () => {
  let service: UserProfileService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getUserProfile', () => {
    it('should return user profile when user exists', async () => {
      const mockUser = { id: '1', profile: { name: 'أحمد' } };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.getUserProfile('1');
      expect(result).toEqual(mockUser.profile);
    });

    it('should return null when user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.getUserProfile('999');
      expect(result).toBeNull();
    });
  });
});
```

#### اختبار التكامل | Integration Tests
```typescript
describe('UserProfile (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  it('/users/profile (GET)', async () => {
    // إنشاء مستخدم تجريبي
    const user = await prismaService.user.create({
      data: {
        email: 'test@example.com',
        name: 'مستخدم تجريبي',
        profile: { bio: 'نبذة تجريبية' },
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}/profile`)
      .expect(200);

    expect(response.body).toHaveProperty('bio', 'نبذة تجريبية');
  });
});
```

### Mobile App Testing

#### اختبار الوحدة | Unit Tests
```dart
void main() {
  group('UserProfileService', () {
    late UserProfileService service;
    late MockApiClient mockApiClient;

    setUp(() {
      mockApiClient = MockApiClient();
      service = UserProfileService(apiClient: mockApiClient);
    });

    test('getUserProfile returns UserProfile when API call is successful', () async {
      // ترتيب
      const userId = '1';
      const expectedProfile = UserProfile(name: 'أحمد', bio: 'نبذة');
      when(mockApiClient.get('/users/$userId/profile'))
          .thenAnswer((_) async => expectedProfile.toJson());

      // تنفيذ
      final result = await service.getUserProfile(userId);

      // تأكيد
      expect(result, equals(expectedProfile));
      verify(mockApiClient.get('/users/$userId/profile')).called(1);
    });

    test('getUserProfile throws exception when API call fails', () async {
      // ترتيب
      const userId = '1';
      when(mockApiClient.get('/users/$userId/profile'))
          .thenThrow(Exception('Network error'));

      // تنفيذ وتأكيد
      expect(
        () => service.getUserProfile(userId),
        throwsA(isA<Exception>()),
      );
    });
  });
}
```

#### اختبار الواجهة | Widget Tests
```dart
void main() {
  group('UserProfileScreen', () {
    testWidgets('displays user profile information', (tester) async {
      // ترتيب
      const userProfile = UserProfile(
        name: 'أحمد محمد',
        bio: 'مطور تطبيقات محترف',
        phone: '+966501234567',
      );

      await tester.pumpWidget(
        MaterialApp(
          home: UserProfileScreen(userProfile: userProfile),
        ),
      );

      // تأكيد
      expect(find.text('أحمد محمد'), findsOneWidget);
      expect(find.text('مطور تطبيقات محترف'), findsOneWidget);
      expect(find.text('+966501234567'), findsOneWidget);
    });

    testWidgets('shows edit button', (tester) async {
      // ترتيب
      const userProfile = UserProfile(name: 'أحمد');
      await tester.pumpWidget(
        MaterialApp(
          home: UserProfileScreen(userProfile: userProfile),
        ),
      );

      // تأكيد
      expect(find.byIcon(Icons.edit), findsOneWidget);
    });
  });
}
```

## 🔄 سير العمل | Workflow

### 1. إنشاء Issue | Creating an Issue

```markdown
## 🎯 وصف المهمة | Task Description
وصف مختصر للمهمة أو المشكلة

## 📋 المتطلبات | Requirements
- [ ] متطلب 1
- [ ] متطلب 2
- [ ] متطلب 3

## 🔍 التفاصيل | Details
وصف مفصل للمهمة

## 💡 الحل المقترح | Proposed Solution
اقتراحك للحل

## 🏷️ التصنيف | Labels
- enhancement
- bug
- documentation
```

### 2. إنشاء Branch | Creating a Branch

```bash
# تحديث الفرع الرئيسي
git checkout main
git pull origin main

# إنشاء فرع جديد
git checkout -b feature/user-profile-enhancement
# أو
git checkout -b fix/login-validation-error
# أو
git checkout -b docs/api-documentation-update
```

### 3. تطوير الميزة | Developing the Feature

```bash
# إجراء التغييرات
# ... تعديل الملفات ...

# إضافة التغييرات
git add .

# إنشاء commit
git commit -m "feat: إضافة تحسينات للملف الشخصي

- إضافة حقل البيو
- تحسين تصميم الواجهة
- إضافة اختبارات جديدة"

# رفع الفرع
git push origin feature/user-profile-enhancement
```

### 4. إنشاء Pull Request | Creating a Pull Request

```markdown
## 📝 وصف التغييرات | Description of Changes
وصف مفصل للتغييرات المنجزة

## 🔗 المرتبط بـ | Related to
Closes #123
Fixes #456

## 🧪 الاختبار | Testing
- [ ] تم اختبار الوحدة
- [ ] تم اختبار التكامل
- [ ] تم اختبار الواجهة
- [ ] تم اختبار الأداء

## 📸 لقطات شاشة | Screenshots
(إذا كان مناسباً)

## 📋 قائمة التحقق | Checklist
- [ ] يتبع الكود معايير المشروع
- [ ] تم إضافة اختبارات مناسبة
- [ ] تم تحديث التوثيق
- [ ] لا يحتوي على أخطاء في التجميع
```

### 5. مراجعة الكود | Code Review

- **المراجع** - يتحقق من جودة الكود
- **المطور** - يستجيب للتعليقات
- **الدمج** - بعد الموافقة

## ❌ ما يجب تجنبه | What to Avoid

### 🚫 في الكود | In Code

- **كود مكرر** - استخدم الدوال المشتركة
- **تعليقات قديمة** - احذف التعليقات غير المستخدمة
- **أسماء غير واضحة** - استخدم أسماء وصفية
- **كود معقد** - اجعل الكود بسيطاً وقابلاً للقراءة
- **إهمال الأمان** - تأكد من حماية البيانات

### 🚫 في الرسائل | In Messages

- **رسائل غير واضحة** - اكتب رسائل مفصلة
- **إهمال التصنيف** - استخدم التصنيفات المناسبة
- **عدم الرد** - رد على التعليقات
- **إرسال كود غير مكتمل** - تأكد من اكتمال الميزة

### 🚫 في العمل | In Work

- **العمل على فرع خاطئ** - تأكد من الفرع الصحيح
- **إهمال الاختبار** - اختبر الكود قبل الإرسال
- **عدم التحديث** - حدث الفرع الرئيسي بانتظام
- **إرسال ملفات كبيرة** - استخدم .gitignore

## 🎯 أولويات التطوير | Development Priorities

### 🔥 عالية الأولوية | High Priority

1. **إصلاح الأخطاء الحرجة** - مشاكل الأمان والأداء
2. **تحسينات UX الأساسية** - سهولة الاستخدام
3. **إصلاح مشاكل التوافق** - دعم المتصفحات والأجهزة
4. **تحسينات الأداء** - سرعة التطبيق

### 📈 متوسطة الأولوية | Medium Priority

1. **ميزات جديدة مفيدة** - تحسين تجربة المستخدم
2. **تحسينات الواجهة** - تصميم أفضل
3. **إضافة اختبارات** - تحسين جودة الكود
4. **تحسين التوثيق** - دليل أفضل للمطورين

### 🌱 منخفضة الأولوية | Low Priority

1. **تحسينات جمالية** - تغييرات بسيطة في التصميم
2. **ميزات تجريبية** - أفكار جديدة
3. **تحسينات الأداء البسيطة** - تحسينات طفيفة
4. **إضافات اختيارية** - ميزات إضافية

## 💬 قنوات التواصل | Communication Channels

### 📧 البريد الإلكتروني | Email
- **الدعم العام**: support@khabeer-al-hay.com
- **التطوير**: dev@khabeer-al-hay.com
- **التصميم**: design@khabeer-al-hay.com

### 💬 الدردشة | Chat
- **Slack**: #khabeer-al-hay-dev
- **Discord**: Khabeer Al-Hay Community
- **Telegram**: @khabeer_al_hay_dev

### 🌐 المنصات | Platforms
- **GitHub**: [Issues](../../issues) و [Discussions](../../discussions)
- **الموقع**: https://khabeer-al-hay.com/community
- **التطبيق**: قسم المجتمع

### 📅 الاجتماعات | Meetings
- **اجتماع أسبوعي**: كل يوم أحد الساعة 8:00 مساءً (توقيت السعودية)
- **اجتماع شهري**: أول يوم سبت من كل شهر
- **اجتماعات خاصة**: حسب الحاجة

## 🏆 الاعتراف | Recognition

### 🌟 المساهمون المميزون | Outstanding Contributors

- **المساهم الأسبوعي** - شارة خاصة للمساهمين النشطين
- **المساهم الشهري** - ذكر في النشرة الإخبارية
- **المساهم السنوي** - شهادة تقدير خاصة

### 🎁 المكافآت | Rewards

- **شهادات المساهمة** - شهادات رسمية
- **شارات GitHub** - شارات خاصة للمشروع
- **ذكر في README** - قائمة المساهمين
- **دعوات للاجتماعات** - مشاركة في القرارات

### 📢 الترويج | Promotion

- **وسائل التواصل الاجتماعي** - ذكر المساهمين
- **المدونة** - مقالات عن المساهمات
- **المؤتمرات** - دعوات للمشاركة
- **الشبكات** - فرص التواصل

## 📚 موارد مفيدة | Useful Resources

### 📖 التوثيق | Documentation

- **[NestJS Docs](https://nestjs.com/)** - دليل NestJS
- **[Flutter Docs](https://flutter.dev/docs)** - دليل Flutter
- **[Prisma Docs](https://www.prisma.io/docs/)** - دليل Prisma
- **[GraphQL Docs](https://graphql.org/learn/)** - دليل GraphQL

### 🎓 التعلم | Learning

- **[NestJS Course](https://learn.nestjs.com/)** - دورة NestJS
- **[Flutter Course](https://flutter.dev/learn)** - دورة Flutter
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - دليل TypeScript
- **[Dart Language Tour](https://dart.dev/guides/language/language-tour)** - دليل Dart

### 🛠️ الأدوات | Tools

- **[VS Code](https://code.visualstudio.com/)** - محرر الكود
- **[Postman](https://www.postman.com/)** - اختبار API
- **[DBeaver](https://dbeaver.io/)** - إدارة قاعدة البيانات
- **[Figma](https://www.figma.com/)** - تصميم الواجهات

### 🔍 البحث | Research

- **[Stack Overflow](https://stackoverflow.com/)** - أسئلة وأجوبة
- **[GitHub](https://github.com/)** - مشاريع مفتوحة المصدر
- **[Dev.to](https://dev.to/)** - مقالات تقنية
- **[Medium](https://medium.com/)** - محتوى تقني

---

## 🎉 شكراً لك | Thank You

شكراً لك على مساهمتك في جعل **خبير الحي** تطبيقاً أفضل! 🌟

Thank you for contributing to making **Khabeer Al-Hay** a better application! 🌟

**"معاً نصنع مستقبلاً أفضل للصيانة المنزلية"** 🏠✨

**"Together we create a better future for home maintenance"** 🏠✨

---

<div align="center">
  <img src="https://img.shields.io/badge/Contributors-Welcome-brightgreen" alt="Contributors Welcome">
  <img src="https://img.shields.io/badge/Open%20Source-MIT-blue" alt="Open Source MIT">
  <img src="https://img.shields.io/badge/Community-Active-orange" alt="Community Active">
</div>