import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.config.js';
import taskRoutes from './routes/taskRoutes.js';
import firebaseTaskRoutes from './routes/firebaseTaskRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env and root .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Connect to database (MongoDB or Firebase)
connectDB();
const LOG_FILE = path.join(__dirname, 'logs/requests.log.csv');

// Ensure log directory exists
const logDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, 'Timestamp,Method,URL,IP,StatusCode\n', 'utf8');
}

// Helper to escape CSV values safely
const escapeCSV = (field) => {
  const str = String(field ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Helper to append log row asynchronously using native 'fs'
const appendLogToCSV = (timestamp, method, url, ip, statusCode) => {
  const row = [
    escapeCSV(timestamp),
    escapeCSV(method),
    escapeCSV(url),
    escapeCSV(ip),
    escapeCSV(statusCode)
  ].join(',') + '\n';

  fs.appendFile(LOG_FILE, row, (err) => {
    if (err) {
      console.error('Error writing request log to CSV:', err.message);
    }
  });
};

const app = express();
const PORT = process.env.PORT || 5000;

app.enable('trust proxy');

// Body parser middleware
app.use(express.json());

// Enable CORS for cross-origin frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request Logging Middleware (Console + CSV File)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';

  res.on('finish', () => {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${req.method} ${req.url} ${ip} - HTTP ${statusCode}`);
    appendLogToCSV(timestamp, req.method, req.url, ip, statusCode);
  });

  next();
});

// Root endpoint
app.get('/', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  const activeDb = (process.env.DB_TYPE || 'mongo').toUpperCase();
  res.status(200).json({
    message: `Task Management API is running (Active DB Provider: ${activeDb})`,
    activeDatabase: process.env.DB_TYPE || 'mongo',
    _links: {
      self:   { href: `${base}/`,          method: 'GET' },
      api:    { href: `${base}/api`,       method: 'GET' },
      tasks:  { href: `${base}/api/tasks`, method: 'GET' },
      create: { href: `${base}/api/tasks`, method: 'POST' }
    }
  });
});

// Discoverable API entry point (HATEOAS Level 3)
app.get('/api', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.status(200).json({
    name: 'Task Management REST API',
    version: '2.0.0',
    activeDatabase: process.env.DB_TYPE || 'mongo',
    description: 'A RESTful API supporting dynamic switching between MongoDB & Firebase Firestore',
    _links: {
      self:       { href: `${base}/api`,       method: 'GET' },
      tasks:      { href: `${base}/api/tasks`, method: 'GET',  description: 'Manage tasks for active DB' },
      createTask: { href: `${base}/api/tasks`, method: 'POST', description: 'Create a new task' }
    }
  });
});

// --- Unified REST Endpoints for Tasks (Switches DB via DB_TYPE in .env) ---
app.use('/api/tasks', taskRoutes);
app.use('/tasks', taskRoutes);

// Optional: Direct Firebase router mount if needed
app.use('/api/firebase/tasks', firebaseTaskRoutes);
app.use('/firebase/tasks', firebaseTaskRoutes);

// Test endpoint for simulating internal server error (500 Internal Server Error)
app.get('/api/error-test', (req, res, next) => {
  const err = new Error('Simulated internal server error');
  err.status = 500;
  next(err);
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Global Error Handling Middleware (Structured JSON Error Responses)
app.use((err, req, res, next) => {
  console.error('[Error Handler Log]:', err.name, '-', err.message);

  // Mongoose Schema Validation Errors (e.g. missing title)
  if (err.name === 'ValidationError') {
    const errors = {};
    const details = [];
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
      details.push({ field: key, message: err.errors[key].message });
    });

    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Task validation failed',
      errors,
      details
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID Format',
      message: `The provided ID '${err.value}' is not a valid MongoDB ObjectId`
    });
  }

  // General server errors
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An internal error occurred',
    status: statusCode
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task Management server running on http://localhost:${PORT}`);
  console.log(`Logging requests to CSV: ${LOG_FILE}`);
});

export default app;
