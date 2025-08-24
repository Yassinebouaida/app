#!/bin/bash

# Khabeer Al-Hay - Startup Script
# سكريبت تشغيل تطبيق خبير الحي

echo "🏠 خبير الحي - Khabeer Al-Hay"
echo "=================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install it first."
    exit 1
fi

echo "🔍 Checking project structure..."
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Function to show status
show_status() {
    echo "📊 Current Status:"
    echo "=================="
    docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""
}

# Function to start services
start_services() {
    echo "🚀 Starting Khabeer Al-Hay services..."
    echo ""
    
    # Create necessary directories
    mkdir -p backend-api/uploads
    mkdir -p backend-api/logs
    
    # Start services
    docker-compose up -d
    
    echo ""
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        echo "✅ Services started successfully!"
        echo ""
        show_status
        echo "🌐 Access URLs:"
        echo "   Backend API: http://localhost:3000"
        echo "   GraphQL Playground: http://localhost:3000/graphql"
        echo "   Mobile Web App: http://localhost:8080"
        echo "   Admin Dashboard: http://localhost:3001"
        echo "   Grafana: http://localhost:3002 (admin/admin123)"
        echo ""
        echo "📝 Default credentials:"
        echo "   Admin: admin@khabeer-al-hay.com / admin123"
        echo "   Craftsman: ahmed.electrician@example.com / craftsman123"
        echo "   Client: client@example.com / client123"
    else
        echo "❌ Some services failed to start. Check logs with: docker-compose logs"
        exit 1
    fi
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping Khabeer Al-Hay services..."
    docker-compose down
    echo "✅ Services stopped"
}

# Function to restart services
restart_services() {
    echo "🔄 Restarting Khabeer Al-Hay services..."
    docker-compose restart
    echo "✅ Services restarted"
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs for all services..."
    docker-compose logs -f
}

# Function to setup database
setup_database() {
    echo "🗄️ Setting up database..."
    
    # Wait for PostgreSQL to be ready
    echo "⏳ Waiting for PostgreSQL to be ready..."
    until docker exec khabeer_postgres pg_isready -U khabeer_user -d khabeer_al_hay > /dev/null 2>&1; do
        sleep 2
    done
    
    echo "✅ PostgreSQL is ready"
    
    # Run database migrations
    echo "🔄 Running database migrations..."
    docker exec khabeer_backend npm run prisma:migrate
    
    # Generate Prisma client
    echo "🔧 Generating Prisma client..."
    docker exec khabeer_backend npm run prisma:generate
    
    echo "✅ Database setup completed"
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start all services (default)"
    echo "  stop      Stop all services"
    echo "  restart   Restart all services"
    echo "  status    Show current status"
    echo "  logs      Show logs for all services"
    echo "  setup-db  Setup database (migrations, etc.)"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start      # Start services"
    echo "  $0 stop       # Stop services"
    echo "  $0 status     # Show status"
    echo "  $0 logs       # Show logs"
}

# Main script logic
case "${1:-start}" in
    "start")
        start_services
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        restart_services
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "setup-db")
        setup_database
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac

echo ""
echo "🎉 Done! For more information, visit: https://github.com/your-repo/khabeer-al-hay"