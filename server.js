const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// إعدادات الأمان والحماية
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());

// إعداد معدل الطلبات
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // الحد الأقصى 100 طلب لكل IP
});
app.use(limiter);

// إعدادات CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// إعدادات المتن
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// اتصال قاعدة البيانات
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/craftsmen-connect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', error.message);
    process.exit(1);
  }
};

connectDB();

// استيراد المسارات
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const craftsmanRoutes = require('./routes/craftsmen');
const serviceRoutes = require('./routes/services');
const requestRoutes = require('./routes/requests');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

// استخدام المسارات
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/craftsmen', craftsmanRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// مجلد الملفات الثابتة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// خدمة الملفات الثابتة للواجهة الأمامية
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// معالجة الأخطاء العامة
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'حدث خطأ في الخادم' });
});

// مسار افتراضي للاختبار
app.get('/api/health', (req, res) => {
  res.json({ message: 'الخادم يعمل بشكل صحيح', timestamp: new Date().toISOString() });
});

// إعداد Socket.IO للإشعارات الفورية
io.on('connection', (socket) => {
  console.log('مستخدم متصل:', socket.id);
  
  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`المستخدم ${userId} انضم للغرفة`);
  });
  
  socket.on('disconnect', () => {
    console.log('مستخدم منقطع:', socket.id);
  });
});

// تصدير io للاستخدام في المسارات الأخرى
app.set('socketio', io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});