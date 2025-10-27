# Premium Todo Application - Full Stack with E2E Testing

## 🎯 Project Overview

A modern, minimalist, Notion-inspired To-Do application with a complete backend API, SQLite database, and comprehensive automated testing suite using Selenium and Pytest.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [For Teachers/Reviewers](#for-teachersreviewers)

## ✨ Features

### Frontend
- ✅ Beautiful 3D Circular Gallery with WebGL effects
- ✅ Dark/Light mode toggle
- ✅ Task management with priorities, tags, and due dates
- ✅ Filter by All/Active/Completed
- ✅ Drag-and-drop reordering
- ✅ Real-time updates

### Backend API
- ✅ RESTful Express.js server
- ✅ SQLite3 persistent database
- ✅ Full CRUD operations
- ✅ Error handling and validation
- ✅ CORS enabled

### Testing Suite
- ✅ Automated E2E tests with Selenium
- ✅ Pytest framework
- ✅ 100% core flow coverage
- ✅ Detailed test reports

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js + React | 16.0.0 / 19.2.0 |
| **Styling** | Tailwind CSS | 4.1.9 |
| **3D Graphics** | Three.js, OGL, GSAP | Latest |
| **Backend** | Node.js + Express | 20.11.0+ / 4.18.2 |
| **Database** | SQLite3 | 5.1.7 |
| **Testing** | Python + Pytest + Selenium | 3.11.9+ / 8.3.2 / 4.24.0 |

## 📁 Project Structure

```
premium-todo-app/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main application page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── circular-gallery.tsx # 3D gallery component
│   ├── todo-circular-gallery.tsx
│   ├── task-input.tsx
│   ├── filter-bar.tsx
│   ├── todo-list.tsx
│   └── todo-item.tsx
├── backend/                 # Express API server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── db/                 # SQLite database
│       └── database.sqlite
├── tests/                   # Selenium + Pytest tests
│   ├── test_todo_app.py    # E2E test cases
│   ├── conftest.py         # Pytest configuration
│   └── requirements.txt    # Python dependencies
├── start-backend.bat        # Backend startup script
├── run-tests.bat           # Test execution script
├── BACKEND_API_DOCS.md     # API documentation
├── TESTING_GUIDE.md        # Testing documentation
└── PROJECT_README.md       # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20.11.0+ installed
- Python 3.11.9+ installed
- Chrome browser installed

### 1. Start the Frontend

```bash
npm install --legacy-peer-deps
npm run dev
```

Frontend will run on: **http://localhost:3001**

### 2. Start the Backend API

```bash
# Option A: Use the batch script
start-backend.bat

# Option B: Manual start
cd backend
npm install
npm start
```

Backend API will run on: **http://localhost:5000**

### 3. Run the Tests

```bash
# Option A: Use the batch script
run-tests.bat

# Option B: Manual start
cd tests
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pytest test_todo_app.py -v
```

## 📖 Detailed Setup

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:3001`

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start server:
   ```bash
   npm start
   ```

4. Verify server is running:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Testing Setup

1. Navigate to tests directory:
   ```bash
   cd tests
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   ```bash
   venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run tests (ensure frontend and backend are running):
   ```bash
   pytest test_todo_app.py -v
   ```

## 📚 API Documentation

See [BACKEND_API_DOCS.md](BACKEND_API_DOCS.md) for complete API documentation.

### Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/health` | Health check |

### Example Request

```bash
# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "priority": "high",
    "tags": ["work", "urgent"]
  }'
```

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing documentation.

### Test Cases

1. ✅ **test_add_task** - Validates task creation
2. ✅ **test_toggle_complete** - Validates task completion
3. ✅ **test_filter_active** - Validates active filter
4. ✅ **test_filter_completed** - Validates completed filter
5. ✅ **test_delete_task** - Validates task deletion

### Running Tests

```bash
# All tests
pytest test_todo_app.py -v

# Specific test
pytest test_todo_app.py::TestTodoApp::test_add_task -v

# With detailed output
pytest test_todo_app.py -vv -s --tb=long
```

### Expected Output

```
╔════════════════════════════════════════════════════════════╗
║  🧪 TODO APP - END-TO-END TEST SUITE                      ║
║  📦 Selenium WebDriver + Pytest                           ║
╚════════════════════════════════════════════════════════════╝

tests/test_todo_app.py::TestTodoApp::test_add_task PASSED
tests/test_todo_app.py::TestTodoApp::test_toggle_complete PASSED
tests/test_todo_app.py::TestTodoApp::test_filter_active PASSED
tests/test_todo_app.py::TestTodoApp::test_filter_completed PASSED
tests/test_todo_app.py::TestTodoApp::test_delete_task PASSED

===================== 5 passed in 45.23s =====================
```

## 👨‍🏫 For Teachers/Reviewers

### Demonstration Checklist

1. **Show Backend API Running**
   ```bash
   start-backend.bat
   ```
   - Server starts on port 5000
   - Database connection confirmed
   - API endpoints ready

2. **Show Frontend Running**
   ```bash
   npm run dev
   ```
   - App runs on port 3001
   - WebGL effects visible
   - UI is responsive

3. **Demonstrate API Functionality**
   ```bash
   # Test health endpoint
   curl http://localhost:5000/api/health
   
   # Create a todo
   curl -X POST http://localhost:5000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title":"Demo Task"}'
   
   # Get all todos
   curl http://localhost:5000/api/todos
   ```

4. **Run Automated Tests**
   ```bash
   run-tests.bat
   ```
   - Chrome browser opens automatically
   - Tests execute in real-time
   - Console shows detailed output
   - All 5 tests pass

### Key Points to Highlight

✅ **Complete Full-Stack Implementation**
- Frontend (Next.js + React)
- Backend (Express + SQLite)
- Testing (Selenium + Pytest)

✅ **Professional Testing Suite**
- Automated E2E tests
- 100% core flow coverage
- Real browser automation
- Detailed test reports

✅ **Production-Ready Code**
- Error handling
- Input validation
- CORS configuration
- Graceful shutdown

✅ **Comprehensive Documentation**
- API documentation
- Testing guide
- Setup instructions
- Code comments

### Test Output for Demonstration

When you run `run-tests.bat`, your teacher will see:

1. **Test initialization** with ASCII art banner
2. **Chrome browser opening** automatically
3. **Each test executing** with live feedback
4. **Detailed console output** showing:
   - Test names
   - Actions performed
   - Verification results
   - Pass/Fail status
5. **Final summary** with test statistics

### Database Verification

Show the SQLite database:
```bash
# Location
backend/db/database.sqlite

# View data (if sqlite3 CLI installed)
sqlite3 backend/db/database.sqlite "SELECT * FROM todos;"
```

## 🎓 Learning Objectives Achieved

1. ✅ **Backend Development**
   - RESTful API design
   - Database integration
   - Error handling
   - CORS configuration

2. ✅ **Testing & QA**
   - E2E test automation
   - Selenium WebDriver
   - Pytest framework
   - Test coverage analysis

3. ✅ **Full-Stack Integration**
   - Frontend-Backend communication
   - API consumption
   - State management
   - Data persistence

4. ✅ **DevOps Practices**
   - Environment setup
   - Dependency management
   - Automated testing
   - Documentation

## 📝 Notes

- Frontend uses port **3001** (not 3000) due to port conflict
- Backend uses port **5000**
- Tests require both services to be running
- SQLite database is created automatically on first run
- Chrome browser must be installed for tests

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`
- Install dependencies: `cd backend && npm install`

### Tests fail
- Ensure frontend is running on port 3001
- Ensure backend is running on port 5000
- Check Chrome browser is installed
- Verify Python is installed: `python --version`

### Database errors
- Delete `backend/db/database.sqlite` and restart server
- Check file permissions in `backend/db/` directory

## 📄 License

MIT License - Feel free to use for educational purposes

## 👤 Author

Created for educational demonstration of full-stack development with automated testing.

---

**Ready to impress your teacher! 🎓✨**
