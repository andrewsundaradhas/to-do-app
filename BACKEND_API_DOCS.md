# Backend API Documentation

## Overview

This is a RESTful API service built with **Express.js** and **SQLite3** for managing a Todo application. The API provides full CRUD operations and is designed for high performance and reliability.

## Technical Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | v20.11.0+ |
| Framework | Express | v4.18.2 |
| Database | SQLite3 | v5.1.7 |
| CORS | cors | v2.8.5 |

## Database Schema

### `todos` Table

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  priority TEXT,
  dueDate TEXT,
  tags TEXT,
  createdAt TEXT NOT NULL
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique task identifier |
| `title` | TEXT | NOT NULL | Task content/description |
| `completed` | BOOLEAN | NOT NULL, DEFAULT 0 | Task status (0=Active, 1=Completed) |
| `priority` | TEXT | NULL | Priority level (high/medium/low) |
| `dueDate` | TEXT | NULL | ISO date string for due date |
| `tags` | TEXT | NULL | JSON array of tags |
| `createdAt` | TEXT | NOT NULL | ISO timestamp of creation |

## API Endpoints

Base URL: `http://localhost:5000/api`

### 1. Get All Todos

**GET** `/api/todos`

Fetches all todo items from the database.

**Request:**
```http
GET /api/todos HTTP/1.1
Host: localhost:5000
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "completed": false,
    "priority": "high",
    "dueDate": "2025-10-30",
    "tags": ["work", "urgent"],
    "createdAt": "2025-10-26T00:00:00.000Z"
  }
]
```

---

### 2. Create Todo

**POST** `/api/todos`

Creates a new todo item.

**Request:**
```http
POST /api/todos HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "title": "New task",
  "priority": "medium",
  "dueDate": "2025-10-30",
  "tags": ["work"]
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "title": "New task",
  "completed": false,
  "priority": "medium",
  "dueDate": "2025-10-30",
  "tags": ["work"],
  "createdAt": "2025-10-26T00:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing or empty title
```json
{
  "error": "Title is required"
}
```

---

### 3. Update Todo

**PUT** `/api/todos/:id`

Updates an existing todo item.

**Request:**
```http
PUT /api/todos/1 HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "completed": true
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "completed": true,
  "priority": "high",
  "dueDate": "2025-10-30",
  "tags": ["work", "urgent"],
  "createdAt": "2025-10-26T00:00:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Todo ID doesn't exist
```json
{
  "error": "Todo not found"
}
```
- `400 Bad Request` - Invalid update data
```json
{
  "error": "Title cannot be empty"
}
```

---

### 4. Delete Todo

**DELETE** `/api/todos/:id`

Deletes a todo item.

**Request:**
```http
DELETE /api/todos/1 HTTP/1.1
Host: localhost:5000
```

**Response:** `204 No Content`

**Error Responses:**
- `404 Not Found` - Todo ID doesn't exist
```json
{
  "error": "Todo not found"
}
```

---

### 5. Health Check

**GET** `/api/health`

Checks if the API server is running.

**Request:**
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

**Response:** `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2025-10-26T00:00:00.000Z"
}
```

## Error Handling

The API uses standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

Credentials are enabled for cross-origin requests.

## Running the Server

### Installation

```bash
cd backend
npm install
```

### Start Server

```bash
npm start
```

Or use the provided script:
```bash
start-backend.bat
```

### Server Output

```
╔════════════════════════════════════════════╗
║  🚀 Backend API Server Running             ║
║  📍 http://localhost:5000                  ║
║  📊 Database: backend/db/database.sqlite   ║
║  ✅ Ready for requests                     ║
╚════════════════════════════════════════════╝
```

## Database Location

The SQLite database file is stored at:
```
backend/db/database.sqlite
```

The database and directory are automatically created on first run.

## Testing the API

### Using curl

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/1
```

### Using Postman

Import the following collection or manually create requests to `http://localhost:5000/api/todos`

## Graceful Shutdown

The server handles `SIGINT` (Ctrl+C) gracefully:
1. Closes database connections
2. Stops accepting new requests
3. Exits cleanly

## Production Considerations

For production deployment:
1. Use environment variables for configuration
2. Implement authentication/authorization
3. Add rate limiting
4. Use a production-grade database (PostgreSQL, MySQL)
5. Enable HTTPS
6. Add logging middleware
7. Implement request validation with libraries like Joi or Yup
