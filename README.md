# assignment-w4-D25AIML081

## Task Management REST API — Portfolio Project

**Student:** Tirth Bhanderi  
**Enrollment:** D25AIML081

### Overview

A full-stack Task Management application built with React (Vite) frontend and Express.js backend, demonstrating REST API design at Richardson Maturity Model Level 3 (HATEOAS).

### Tech Stack

- **Frontend:** React 19, React Router, Vite
- **Backend:** Node.js, Express 5
- **Styling:** Vanilla CSS with dark mode support

### Features

- Full CRUD operations on tasks (Create, Read, Update, Delete)
- HATEOAS hypermedia links in every API response
- Discoverable API entry point (`GET /api`)
- Request logging to CSV
- Global error handling middleware
- CORS enabled for cross-origin requests
- Dark/Light theme toggle
- API Explorer page for interactive testing

### Running Locally

```bash
# Install dependencies
npm install

# Start the backend server (port 5000)
npm run server

# Start the frontend dev server
npm run dev
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API root — discoverable entry point |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Full update a task |
| PATCH | `/api/tasks/:id` | Partial update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### REST Maturity

See [MATURITY.md](MATURITY.md) for the full Richardson Maturity Model evaluation with HATEOAS examples.