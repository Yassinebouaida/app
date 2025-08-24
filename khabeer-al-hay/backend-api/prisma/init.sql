-- Initialize Khabeer Al-Hay Database
-- This file is executed when the PostgreSQL container starts

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE khabeer_al_hay'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'khabeer_al_hay')\gexec

-- Connect to the database
\c khabeer_al_hay;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE "UserType" AS ENUM ('CLIENT', 'CRAFTSMAN', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'LOCATION', 'SYSTEM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "users_phone_idx" ON "users" ("phone");
CREATE INDEX IF NOT EXISTS "users_user_type_idx" ON "users" ("userType");
CREATE INDEX IF NOT EXISTS "users_location_idx" ON "users" ("latitude", "longitude");
CREATE INDEX IF NOT EXISTS "users_city_idx" ON "users" ("city");

CREATE INDEX IF NOT EXISTS "service_requests_status_idx" ON "service_requests" ("status");
CREATE INDEX IF NOT EXISTS "service_requests_specialty_idx" ON "service_requests" ("specialtyId");
CREATE INDEX IF NOT EXISTS "service_requests_location_idx" ON "service_requests" ("latitude", "longitude");
CREATE INDEX IF NOT EXISTS "service_requests_created_idx" ON "service_requests" ("createdAt");

CREATE INDEX IF NOT EXISTS "offers_status_idx" ON "offers" ("status");
CREATE INDEX IF NOT EXISTS "offers_request_idx" ON "offers" ("requestId");
CREATE INDEX IF NOT EXISTS "offers_craftsman_idx" ON "offers" ("craftsmanId");

CREATE INDEX IF NOT EXISTS "ratings_user_idx" ON "ratings" ("ratedUserId");
CREATE INDEX IF NOT EXISTS "ratings_request_idx" ON "ratings" ("requestId");

CREATE INDEX IF NOT EXISTS "payments_status_idx" ON "payments" ("status");
CREATE INDEX IF NOT EXISTS "payments_request_idx" ON "payments" ("requestId");

-- Create full-text search indexes
CREATE INDEX IF NOT EXISTS "users_search_idx" ON "users" USING gin(to_tsvector('arabic', "firstName" || ' ' || "lastName" || ' ' || COALESCE("bio", '')));
CREATE INDEX IF NOT EXISTS "service_requests_search_idx" ON "service_requests" USING gin(to_tsvector('arabic', "title" || ' ' || "description"));

-- Create spatial indexes for location-based queries
CREATE INDEX IF NOT EXISTS "users_spatial_idx" ON "users" USING gist (ll_to_earth("latitude", "longitude"));
CREATE INDEX IF NOT EXISTS "service_requests_spatial_idx" ON "service_requests" USING gist (ll_to_earth("latitude", "longitude"));

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE khabeer_al_hay TO khabeer_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO khabeer_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO khabeer_user;

-- Create admin user
INSERT INTO "users" (
    "id", "email", "phone", "password", "firstName", "lastName", 
    "userType", "isActive", "isVerified", "createdAt", "updatedAt"
) VALUES (
    'admin-001', 'admin@khabeer-al-hay.com', '+966501234567',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', -- password: admin123
    'مدير', 'النظام', 'ADMIN', true, true, NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Insert default specialties
INSERT INTO "specialties" (
    "id", "nameAr", "nameEn", "description", "icon", "isActive", "createdAt", "updatedAt"
) VALUES 
    ('spec-001', 'كهربائي', 'Electrician', 'تركيب وصيانة الأنظمة الكهربائية', 'electrical_services', true, NOW(), NOW()),
    ('spec-002', 'سباك', 'Plumber', 'إصلاح وصيانة أنظمة السباكة والمياه', 'plumbing', true, NOW(), NOW()),
    ('spec-003', 'نجار', 'Carpenter', 'أعمال النجارة والأثاث الخشبي', 'construction', true, NOW(), NOW()),
    ('spec-004', 'فني تكييف', 'AC Technician', 'صيانة وإصلاح أجهزة التكييف', 'ac_unit', true, NOW(), NOW()),
    ('spec-005', 'دهان', 'Painter', 'دهان الجدران والأسطح', 'format_paint', true, NOW(), NOW()),
    ('spec-006', 'فني أجهزة', 'Appliance Repair', 'صيانة الأجهزة المنزلية', 'home_repair_service', true, NOW(), NOW()),
    ('spec-007', 'مقاول عام', 'General Contractor', 'أعمال البناء والتشييد العامة', 'handyman', true, NOW(), NOW()),
    ('spec-008', 'مصمم ديكور', 'Interior Designer', 'تصميم وتنسيق الديكور الداخلي', 'design_services', true, NOW(), NOW())
ON CONFLICT ("nameEn") DO NOTHING;

-- Create sample craftsman user
INSERT INTO "users" (
    "id", "email", "phone", "password", "firstName", "lastName", 
    "userType", "isActive", "isVerified", "bio", "experience", "hourlyRate",
    "latitude", "longitude", "address", "city", "createdAt", "updatedAt"
) VALUES (
    'craftsman-001', 'ahmed.electrician@example.com', '+966501234568',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', -- password: craftsman123
    'أحمد', 'الكهربائي', 'CRAFTSMAN', true, true, 
    'كهربائي محترف مع خبرة 15 سنة في جميع أنواع الأعمال الكهربائية', 15, 150.0,
    24.7136, 46.6753, 'شارع الملك فهد', 'الرياض', NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Link craftsman to specialty
INSERT INTO "user_specialties" (
    "id", "userId", "specialtyId", "createdAt"
) VALUES (
    'us-001', 'craftsman-001', 'spec-001', NOW()
) ON CONFLICT ("userId", "specialtyId") DO NOTHING;

-- Create sample client user
INSERT INTO "users" (
    "id", "email", "phone", "password", "firstName", "lastName", 
    "userType", "isActive", "isVerified", "latitude", "longitude", "address", "city", "createdAt", "updatedAt"
) VALUES (
    'client-001', 'client@example.com', '+966501234569',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', -- password: client123
    'محمد', 'العميل', 'CLIENT', true, true,
    24.7136, 46.6753, 'شارع الملك فهد', 'الرياض', NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Create sample service request
INSERT INTO "service_requests" (
    "id", "title", "description", "latitude", "longitude", "address",
    "estimatedPrice", "urgency", "clientId", "specialtyId", "status", "createdAt", "updatedAt"
) VALUES (
    'req-001', 'إصلاح مشكلة كهربائية', 'انقطاع في الكهرباء في غرفة النوم الرئيسية', 
    24.7136, 46.6753, 'شارع الملك فهد، الرياض',
    300.0, 'MEDIUM', 'client-001', 'spec-001', 'PENDING', NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Create sample offer
INSERT INTO "offers" (
    "id", "price", "description", "estimatedTime", "status",
    "requestId", "craftsmanId", "createdAt", "updatedAt"
) VALUES (
    'offer-001', 250.0, 'سأقوم بإصلاح المشكلة في غضون ساعتين', '2 hours', 'PENDING',
    'req-001', 'craftsman-001', NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Create chat for the request
INSERT INTO "chats" (
    "id", "requestId", "createdAt", "updatedAt"
) VALUES (
    'chat-001', 'req-001', NOW(), NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Create sample chat message
INSERT INTO "chat_messages" (
    "id", "content", "messageType", "isRead", "chatId", "senderId", "createdAt"
) VALUES (
    'msg-001', 'مرحباً، متى يمكنك البدء في العمل؟', 'TEXT', false, 'chat-001', 'client-001', NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Update sequence values
SELECT setval('users_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM users));
SELECT setval('specialties_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM specialties));
SELECT setval('service_requests_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM service_requests));
SELECT setval('offers_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM offers));
SELECT setval('chats_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM chats));
SELECT setval('chat_messages_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM chat_messages));

-- Print completion message
SELECT 'Database initialization completed successfully!' as status;