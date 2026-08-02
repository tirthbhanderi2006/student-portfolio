import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, 'logs/requests.log.csv');

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

// 1. Request Logging Middleware (Console + CSV File)
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

// In-memory data store for tasks
let tasks = [
  {
    id: 1,
    title: 'Learn Node.js & Express',
    description: 'Understand core Node modules, Express routing, and middleware',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Build Task Management Backend',
    description: 'Implement REST endpoints with logging and error handling',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Helper to find task by ID
const findTaskById = (idParam) => {
  const id = parseInt(idParam, 10);
  if (isNaN(id)) return null;
  return tasks.find((t) => t.id === id);
};

// HATEOAS: Build hypermedia links for a single task
const buildTaskLinks = (req, taskId) => {
  const base = `${req.protocol}://${req.get('host')}`;
  return {
    self:       { href: `${base}/api/tasks/${taskId}`, method: 'GET' },
    update:     { href: `${base}/api/tasks/${taskId}`, method: 'PUT' },
    patch:      { href: `${base}/api/tasks/${taskId}`, method: 'PATCH' },
    delete:     { href: `${base}/api/tasks/${taskId}`, method: 'DELETE' },
    collection: { href: `${base}/api/tasks`,           method: 'GET' }
  };
};

// HATEOAS: Enrich a task object with _links
const enrichTask = (req, task) => ({
  ...task,
  _links: buildTaskLinks(req, task.id)
});

// Root endpoint
app.get('/', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.status(200).json({
    message: 'Task Management API is running',
    _links: {
      self:    { href: `${base}/`,          method: 'GET' },
      api:     { href: `${base}/api`,       method: 'GET' },
      tasks:   { href: `${base}/api/tasks`, method: 'GET' },
      create:  { href: `${base}/api/tasks`, method: 'POST' }
    }
  });
});

// Discoverable API entry point (HATEOAS Level 3)
app.get('/api', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.status(200).json({
    name: 'Task Management REST API',
    version: '1.0.0',
    description: 'A RESTful API demonstrating Richardson Maturity Model Level 3 with HATEOAS',
    _links: {
      self:       { href: `${base}/api`,       method: 'GET' },
      tasks:      { href: `${base}/api/tasks`, method: 'GET',  description: 'List all tasks' },
      createTask: { href: `${base}/api/tasks`, method: 'POST', description: 'Create a new task' }
    }
  });
});

// --- REST Endpoints for Tasks (Richardson Level 2 + Level 3 HATEOAS) ---

// GET /api/tasks - Read all tasks (200 OK)
app.get(['/api/tasks', '/tasks'], (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.status(200).json({
    count: tasks.length,
    _links: {
      self:   { href: `${base}/api/tasks`, method: 'GET' },
      create: { href: `${base}/api/tasks`, method: 'POST' }
    },
    data: tasks.map(t => enrichTask(req, t))
  });
});

// GET /api/tasks/:id - Read a single task by ID (200 OK or 404 Not Found)
app.get(['/api/tasks/:id', '/tasks/:id'], (req, res, next) => {
  try {
    const task = findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }
    res.status(200).json(enrichTask(req, task));
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Create a new task (201 Created + Location header)
app.post(['/api/tasks', '/tasks'], (req, res, next) => {
  try {
    const { title, description = '', completed = false } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      completed: Boolean(completed),
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    const base = `${req.protocol}://${req.get('host')}`;
    res.setHeader('Location', `${base}/api/tasks/${newTask.id}`);
    res.status(201).json(enrichTask(req, newTask));
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id - Full update of an existing task (200 OK or 404 Not Found)
app.put(['/api/tasks/:id', '/tasks/:id'], (req, res, next) => {
  try {
    const task = findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title must be a non-empty string' });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = String(description).trim();
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    task.updatedAt = new Date().toISOString();

    res.status(200).json(enrichTask(req, task));
  } catch (err) {
    next(err);
  }
});

// PATCH /api/tasks/:id - Partial update (200 OK or 404 Not Found)
app.patch(['/api/tasks/:id', '/tasks/:id'], (req, res, next) => {
  try {
    const task = findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title must be a non-empty string' });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = String(description).trim();
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    task.updatedAt = new Date().toISOString();

    res.status(200).json(enrichTask(req, task));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Delete a task (200 OK or 404 Not Found)
app.delete(['/api/tasks/:id', '/tasks/:id'], (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json({ message: 'Task deleted successfully', task: enrichTask(req, deletedTask) });
  } catch (err) {
    next(err);
  }
});

// Test endpoint for simulating internal server error (500 Internal Server Error)
app.get('/api/error-test', (req, res, next) => {
  const err = new Error('Simulated internal server error');
  err.status = 500;
  next(err);
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// 2. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught an error:', err.message || err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    status: statusCode
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task Management server running on http://localhost:${PORT}`);
  console.log(`Logging requests to CSV: ${LOG_FILE}`);
});

export default app;
