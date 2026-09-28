/**
 * Department Resource Management System - Express Server
 * Serves the SPA frontend and provides REST API endpoints.
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { protect } = require('./middleware/auth');

// Route imports
const authRoutes = require('./routes/authRoutes');
const regulationRoutes = require('./routes/regulationRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const careerRoutes = require('./routes/careerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for SPA with inline styles
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));

// ── Rate Limiting ────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});
app.use('/api', limiter);

// ── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Logging ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ── Static Files (SPA & Uploads) ─────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/regulations', regulationRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/search', searchRoutes);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Department Resource Management System API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ── SPA Catch-All (serve index.html for all non-API routes) ──────────────────
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// ── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Database & Server Start ───────────────────────────────────────────────────
const startServer = async () => {
  try {
    // Connect to MongoDB (graceful - will use fallback data if unavailable)
    const dbConn = await connectDB().catch(err => {
      console.warn('⚠️  MongoDB connection failed - running in offline/demo mode:', err.message);
      return null;
    });

    // Seed admin user if DB is connected
    if (dbConn) {
      const seedAdmin = require('./config/seedAdmin');
      await seedAdmin();
    }

    app.listen(PORT, () => {
      console.log(`\n🚀 DRMS Server running at http://localhost:${PORT}`);
      console.log(`📚 Flow: Login → Regulation → Department → Semester → Subject → Resources`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (err) {
    console.error('❌ Fatal server error:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
