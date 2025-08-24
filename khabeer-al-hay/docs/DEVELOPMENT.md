# دليل التطوير - Development Guide

دليل شامل لتطوير تطبيق خبير الحي

A comprehensive guide for developing the Khabeer Al-Hay application

## 🚀 البدء السريع | Quick Start

### المتطلبات | Prerequisites
- **Node.js** 18+ 
- **Flutter SDK** 3.0+
- **Docker** & **Docker Compose**
- **PostgreSQL** 15+ (optional for local development)
- **Redis** 7+ (optional for local development)

### 1. استنساخ المشروع | Clone the Project
```bash
git clone <repository-url>
cd khabeer-al-hay
```

### 2. تشغيل البيئة | Start Environment
```bash
# Using Makefile (recommended)
make dev

# Or using the startup script
./start.sh start

# Or manually with Docker Compose
docker-compose up -d
```

### 3. إعداد قاعدة البيانات | Database Setup
```bash
# Automatic setup (recommended)
make setup-db

# Manual setup
docker exec khabeer_backend npm run prisma:migrate
docker exec khabeer_backend npm run prisma:generate
```

### 4. الوصول للتطبيقات | Access Applications
- **Backend API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql
- **Mobile Web App**: http://localhost:8080
- **Admin Dashboard**: http://localhost:3001
- **Grafana**: http://localhost:3002 (admin/admin123)

## 🏗️ هيكل المشروع | Project Structure

```
khabeer-al-hay/
├── backend-api/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── specialties/        # Craftsman specialties
│   │   ├── requests/           # Service requests
│   │   ├── offers/             # Price offers
│   │   ├── chat/               # Real-time messaging
│   │   ├── ratings/            # Rating system
│   │   ├── payments/           # Payment processing
│   │   ├── admin/              # Admin panel
│   │   └── common/             # Shared utilities
│   ├── prisma/                 # Database schema & migrations
│   ├── test/                   # Test files
│   └── package.json
├── mobile-app/                  # Flutter Mobile App
│   ├── lib/
│   │   ├── screens/            # UI Screens
│   │   ├── widgets/            # Reusable widgets
│   │   ├── services/           # API services
│   │   ├── models/             # Data models
│   │   ├── providers/          # State management
│   │   └── utils/              # Helper functions
│   ├── assets/                 # Images, fonts, etc.
│   └── pubspec.yaml
├── deployment/                  # Docker & deployment configs
├── docs/                       # Documentation
└── docker-compose.yml          # Development environment
```

## 🔧 التطوير المحلي | Local Development

### Backend Development

#### 1. إعداد البيئة | Environment Setup
```bash
cd backend-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update environment variables
# Edit .env file with your local settings
```

#### 2. قاعدة البيانات المحلية | Local Database
```bash
# Start PostgreSQL locally
docker run -d \
  --name postgres-local \
  -e POSTGRES_DB=khabeer_al_hay \
  -e POSTGRES_USER=khabeer_user \
  -e POSTGRES_PASSWORD=khabeer_password \
  -p 5432:5432 \
  postgres:15-alpine

# Start Redis locally
docker run -d \
  --name redis-local \
  -p 6379:6379 \
  redis:7-alpine
```

#### 3. تشغيل الخادم | Run Server
```bash
# Development mode with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

#### 4. قاعدة البيانات | Database Operations
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Reset database
npm run prisma:migrate:reset

# Open Prisma Studio
npm run prisma:studio

# Seed database
npm run prisma:db:seed
```

### Mobile App Development

#### 1. إعداد البيئة | Environment Setup
```bash
cd mobile-app

# Install dependencies
flutter pub get

# Check Flutter installation
flutter doctor
```

#### 2. تشغيل التطبيق | Run Application
```bash
# Web development
flutter run -d chrome

# Android emulator
flutter run -d android

# iOS simulator (macOS only)
flutter run -d ios

# Specific device
flutter devices
flutter run -d <device-id>
```

#### 3. بناء التطبيق | Build Application
```bash
# Web build
flutter build web

# Android APK
flutter build apk

# Android App Bundle
flutter build appbundle

# iOS build
flutter build ios
```

## 🧪 الاختبار | Testing

### Backend Testing
```bash
cd backend-api

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run specific test file
npm run test -- auth.service.spec.ts
```

### Mobile App Testing
```bash
cd mobile-app

# Run all tests
flutter test

# Run tests with coverage
flutter test --coverage

# Run specific test file
flutter test test/widget_test.dart
```

### API Testing
```bash
# Using GraphQL Playground
# Visit: http://localhost:3000/graphql

# Example queries:
query {
  specialties {
    id
    nameAr
    nameEn
    description
  }
}

mutation {
  register(input: {
    email: "test@example.com"
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

## 📊 المراقبة والتحليل | Monitoring & Analytics

### Prometheus Metrics
```bash
# Access Prometheus
http://localhost:9090

# Key metrics to monitor:
# - Request rate per second
# - Response time percentiles
# - Error rate
# - Resource usage (CPU, Memory, Disk)
```

### Grafana Dashboards
```bash
# Access Grafana
http://localhost:3002
# Username: admin
# Password: admin123

# Available dashboards:
# - User Activity Dashboard
# - Request Performance Dashboard
# - Business Metrics Dashboard
# - System Health Dashboard
```

### Application Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f mobile-web
docker-compose logs -f postgres
```

## 🔒 الأمان | Security

### Environment Variables
```bash
# Never commit sensitive data
# Use .env.example for reference
# Update .env with your actual values

# Required variables:
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379
```

### Authentication & Authorization
```bash
# JWT tokens are automatically handled
# Admin routes are protected with AdminGuard
# User-specific routes check ownership

# Test admin access:
# Login as admin user first
# Use the returned JWT token in Authorization header
```

### Database Security
```bash
# Use parameterized queries (Prisma handles this)
# Implement row-level security if needed
# Regular security updates for PostgreSQL
```

## 🚀 النشر | Deployment

### Development Deployment
```bash
# Current setup is development-focused
# Services run in Docker containers
# Database persists in Docker volumes
```

### Production Deployment
```bash
# Create production docker-compose file
docker-compose -f docker-compose.prod.yml up -d

# Set production environment variables
# Configure SSL/HTTPS
# Set up monitoring and alerting
# Implement backup strategies
```

### CI/CD Pipeline
```bash
# GitHub Actions workflow
# Automatic testing on push
# Build and deploy on merge to main
# Environment-specific deployments
```

## 🐛 استكشاف الأخطاء | Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check database logs
docker-compose logs postgres

# Test connection
docker exec khabeer_postgres pg_isready -U khabeer_user -d khabeer_al_hay
```

#### 2. Port Conflicts
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8080
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.yml
```

#### 3. Flutter Build Issues
```bash
# Clean Flutter build
flutter clean
flutter pub get

# Check Flutter version
flutter --version

# Update Flutter
flutter upgrade
```

#### 4. Node.js Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
```

### Debug Mode
```bash
# Backend debug
npm run start:debug

# Flutter debug
flutter run -d chrome --debug

# Database debug
# Enable query logging in Prisma
# Add to .env: DEBUG="prisma:*"
```

## 📚 الموارد | Resources

### Documentation
- [NestJS Documentation](https://docs.nestjs.com/)
- [Flutter Documentation](https://flutter.dev/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)

### Community
- [NestJS Discord](https://discord.gg/nestjs)
- [Flutter Community](https://flutter.dev/community)
- [Prisma Community](https://www.prisma.io/community)

### Tools
- [GraphQL Playground](http://localhost:3000/graphql)
- [Prisma Studio](http://localhost:5555)
- [Grafana](http://localhost:3002)
- [Prometheus](http://localhost:9090)

## 🤝 المساهمة | Contributing

### Code Style
```bash
# Backend (NestJS)
npm run format        # Prettier formatting
npm run lint          # ESLint checking

# Mobile App (Flutter)
flutter analyze       # Dart analysis
flutter format        # Dart formatting
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

### Testing Requirements
- All new features must have tests
- Maintain test coverage above 80%
- Run tests before committing
- Update documentation for new features

---

## 📞 الدعم | Support

إذا واجهت أي مشكلة أو لديك سؤال:

If you encounter any issues or have questions:

- **Create an Issue**: [GitHub Issues](../../issues)
- **Email**: dev-support@khabeer-al-hay.com
- **Documentation**: [Project Docs](./README.md)

---

**"معاً نطور مستقبل الصيانة المنزلية"** 🏠✨

**"Together we develop the future of home maintenance"** 🏠✨