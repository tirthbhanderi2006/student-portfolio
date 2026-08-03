# REST API Maturity Evaluation — Task Management API

**Student:** Tirth Bhanderi  
**Enrollment:** D25AIML081  
**Assignment:** Week 4 — Richardson Maturity Model Analysis

---

## Richardson Maturity Model — Evaluation Table

| Level | Name | Requirement | Our API Status | Evidence |
|-------|------|-------------|:--------------:|----------|
| **Level 0** | The Swamp of POX | Single URI, single HTTP method (e.g., POST-only RPC) | ✅ Surpassed | We do **not** tunnel everything through one endpoint. Each resource has its own URI. |
| **Level 1** | Resources | Individual URIs for distinct resources | ✅ Compliant | `GET /api/tasks` (collection), `GET /api/tasks/:id` (individual resource), `GET /api` (API root). |
| **Level 2** | HTTP Verbs + Status Codes | Correct use of HTTP methods (GET, POST, PUT, PATCH, DELETE) and status codes (200, 201, 204, 400, 404, 500) | ✅ Compliant | **GET** for reads, **POST** for creation (returns `201 Created` + `Location` header), **PUT** for full update, **PATCH** for partial update, **DELETE** for removal. Error responses use `400`, `404`, and `500` appropriately. |
| **Level 3** | HATEOAS (Hypermedia) | Responses include hypermedia links that guide the client to available next actions | ✅ Compliant | Every task response includes `_links` with `self`, `update`, `patch`, `delete`, and `collection` links. Collection responses include `self` and `create` links. See HATEOAS example below. |

---

## Level 2 Compliance — Detailed Breakdown

| Endpoint | Method | Success Code | Error Codes | Notes |
|----------|--------|:------------:|:-----------:|-------|
| `GET /api/tasks` | GET | `200 OK` | — | Returns all tasks with count and HATEOAS links |
| `GET /api/tasks/:id` | GET | `200 OK` | `404 Not Found` | Returns single task or 404 if not found |
| `POST /api/tasks` | POST | `201 Created` | `400 Bad Request` | Sets `Location` header pointing to the new resource |
| `PUT /api/tasks/:id` | PUT | `200 OK` | `400 Bad Request`, `404 Not Found` | Full update — validates title is non-empty string |
| `PATCH /api/tasks/:id` | PATCH | `200 OK` | `400 Bad Request`, `404 Not Found` | Partial update — only supplied fields are changed |
| `DELETE /api/tasks/:id` | DELETE | `200 OK` | `404 Not Found` | Returns deleted task with confirmation message |
| `GET /api/error-test` | GET | — | `500 Internal Server Error` | Test route to verify global error handler |

### Level 2 Violations Found & Corrected

| # | Violation | Where | Fix Applied |
|---|-----------|-------|-------------|
| — | **None** | — | The API already uses correct HTTP verbs for each operation and returns semantically appropriate status codes. No Level 2 violations were found. |

---

## Level 3 — HATEOAS Example

### Request

```http
GET /api/tasks/1 HTTP/1.1
Host: localhost:5000
Accept: application/json
```

### Response (`200 OK`)

```json
{
  "id": 1,
  "title": "Learn Node.js & Express",
  "description": "Understand core Node modules, Express routing, and middleware",
  "completed": true,
  "createdAt": "2026-08-03T09:30:00.000Z",
  "_links": {
    "self":       { "href": "http://localhost:5000/api/tasks/1", "method": "GET" },
    "update":     { "href": "http://localhost:5000/api/tasks/1", "method": "PUT" },
    "patch":      { "href": "http://localhost:5000/api/tasks/1", "method": "PATCH" },
    "delete":     { "href": "http://localhost:5000/api/tasks/1", "method": "DELETE" },
    "collection": { "href": "http://localhost:5000/api/tasks",   "method": "GET" }
  }
}
```

### How HATEOAS Helps the Client

The `_links` object tells the client **what it can do next** without hard-coding any URLs:

1. **`self`** — Re-fetch this task to get the latest state.
2. **`update`** — Send a `PUT` to fully replace the task.
3. **`patch`** — Send a `PATCH` to partially modify the task.
4. **`delete`** — Send a `DELETE` to remove the task.
5. **`collection`** — Navigate back to the full task list.

This decouples the client from the server's URL structure — if endpoints change, the client simply follows links instead of breaking.

---

## API Discoverability (Entry Point)

```http
GET /api HTTP/1.1
Host: localhost:5000
```

```json
{
  "name": "Task Management REST API",
  "version": "1.0.0",
  "description": "A RESTful API demonstrating Richardson Maturity Model Level 3 with HATEOAS",
  "_links": {
    "self":       { "href": "http://localhost:5000/api",       "method": "GET" },
    "tasks":      { "href": "http://localhost:5000/api/tasks", "method": "GET",  "description": "List all tasks" },
    "createTask": { "href": "http://localhost:5000/api/tasks", "method": "POST", "description": "Create a new task" }
  }
}
```

---

## Middleware & Cross-Cutting Concerns

| Feature | Implementation |
|---------|---------------|
| **Request Logging** | Every request is logged to console and appended to `backend/logs/requests.log.csv` with timestamp, method, URL, IP, and status code. |
| **CORS** | Enabled for all origins (`*`) to allow cross-origin frontend requests. |
| **Body Parsing** | `express.json()` middleware parses incoming JSON payloads. |
| **Global Error Handler** | Catches all unhandled errors and returns structured JSON with status code and message. |
| **404 Fallback** | Undefined routes return a `404` JSON response instead of Express's default HTML. |

---

## Conclusion

The Task Management REST API achieves **Richardson Maturity Model Level 3**. It uses individual resource URIs (Level 1), correct HTTP verbs and status codes (Level 2), and full HATEOAS hypermedia controls (Level 3) enabling client-driven API discovery.
