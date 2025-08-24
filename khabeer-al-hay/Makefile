# Khabeer Al-Hay - Makefile
# ملف Makefile لتطبيق خبير الحي

.PHONY: help start stop restart status logs setup-db clean build test deploy

# Default target
help: ## Show this help message
	@echo "🏠 خبير الحي - Khabeer Al-Hay"
	@echo "================================"
	@echo ""
	@echo "Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

# Docker commands
start: ## Start all services
	@echo "🚀 Starting Khabeer Al-Hay services..."
	docker-compose up -d
	@echo "✅ Services started. Use 'make status' to check status."

stop: ## Stop all services
	@echo "🛑 Stopping Khabeer Al-Hay services..."
	docker-compose down
	@echo "✅ Services stopped."

restart: ## Restart all services
	@echo "🔄 Restarting Khabeer Al-Hay services..."
	docker-compose restart
	@echo "✅ Services restarted."

status: ## Show current status of all services
	@echo "📊 Current Status:"
	@echo "=================="
	docker-compose ps

logs: ## Show logs for all services
	@echo "📋 Showing logs for all services..."
	docker-compose logs -f

# Database commands
setup-db: ## Setup database (migrations, seed data)
	@echo "🗄️ Setting up database..."
	@echo "⏳ Waiting for PostgreSQL to be ready..."
	@until docker exec khabeer_postgres pg_isready -U khabeer_user -d khabeer_al_hay > /dev/null 2>&1; do \
		sleep 2; \
	done
	@echo "✅ PostgreSQL is ready"
	@echo "🔄 Running database migrations..."
	docker exec khabeer_backend npm run prisma:migrate
	@echo "🔧 Generating Prisma client..."
	docker exec khabeer_backend npm run prisma:generate
	@echo "✅ Database setup completed"

reset-db: ## Reset database (drop and recreate)
	@echo "🗑️ Resetting database..."
	docker-compose down -v
	docker-compose up -d postgres
	@echo "⏳ Waiting for PostgreSQL to be ready..."
	@until docker exec khabeer_postgres pg_isready -U khabeer_user -d khabeer_al_hay > /dev/null 2>&1; do \
		sleep 2; \
	done
	@echo "✅ PostgreSQL is ready"
	@echo "🔄 Running database migrations..."
	docker exec khabeer_backend npm run prisma:migrate
	@echo "🔧 Generating Prisma client..."
	docker exec khabeer_backend npm run prisma:generate
	@echo "✅ Database reset completed"

# Development commands
install: ## Install dependencies for all services
	@echo "📦 Installing backend dependencies..."
	cd backend-api && npm install
	@echo "📦 Installing mobile app dependencies..."
	cd mobile-app && flutter pub get
	@echo "✅ Dependencies installed"

build: ## Build all services
	@echo "🔨 Building backend..."
	cd backend-api && npm run build
	@echo "🔨 Building mobile app..."
	cd mobile-app && flutter build web
	@echo "✅ Build completed"

test: ## Run tests for all services
	@echo "🧪 Running backend tests..."
	cd backend-api && npm run test
	@echo "🧪 Running mobile app tests..."
	cd mobile-app && flutter test
	@echo "✅ Tests completed"

# Backend specific commands
backend-install: ## Install backend dependencies
	@echo "📦 Installing backend dependencies..."
	cd backend-api && npm install

backend-dev: ## Start backend in development mode
	@echo "🚀 Starting backend in development mode..."
	cd backend-api && npm run start:dev

backend-build: ## Build backend
	@echo "🔨 Building backend..."
	cd backend-api && npm run build

backend-test: ## Run backend tests
	@echo "🧪 Running backend tests..."
	cd backend-api && npm run test

# Mobile app specific commands
mobile-install: ## Install mobile app dependencies
	@echo "📦 Installing mobile app dependencies..."
	cd mobile-app && flutter pub get

mobile-dev: ## Start mobile app in development mode
	@echo "🚀 Starting mobile app in development mode..."
	cd mobile-app && flutter run -d chrome

mobile-build: ## Build mobile app
	@echo "🔨 Building mobile app..."
	cd mobile-app && flutter build web

mobile-test: ## Run mobile app tests
	@echo "🧪 Running mobile app tests..."
	cd mobile-app && flutter test

# Utility commands
clean: ## Clean up Docker containers and volumes
	@echo "🧹 Cleaning up Docker containers and volumes..."
	docker-compose down -v --remove-orphans
	docker system prune -f
	@echo "✅ Cleanup completed"

logs-backend: ## Show backend logs
	@echo "📋 Showing backend logs..."
	docker-compose logs -f backend

logs-mobile: ## Show mobile app logs
	@echo "📋 Showing mobile app logs..."
	docker-compose logs -f mobile-web

logs-db: ## Show database logs
	@echo "📋 Showing database logs..."
	docker-compose logs -f postgres

# Production commands
deploy: ## Deploy to production
	@echo "🚀 Deploying to production..."
	@echo "⚠️  This is a placeholder for production deployment"
	@echo "📝 Please implement your production deployment strategy"

# Monitoring commands
monitor: ## Open monitoring dashboards
	@echo "📊 Opening monitoring dashboards..."
	@echo "🌐 Grafana: http://localhost:3002 (admin/admin123)"
	@echo "🌐 Prometheus: http://localhost:9090"
	@echo "🌐 Backend Health: http://localhost:3000/health"

# Quick start for development
dev: start setup-db ## Quick start for development (start services + setup DB)
	@echo "🎉 Development environment ready!"
	@echo "🌐 Access URLs:"
	@echo "   Backend API: http://localhost:3000"
	@echo "   GraphQL Playground: http://localhost:3000/graphql"
	@echo "   Mobile Web App: http://localhost:8080"
	@echo "   Admin Dashboard: http://localhost:3001"
	@echo "   Grafana: http://localhost:3002 (admin/admin123)"