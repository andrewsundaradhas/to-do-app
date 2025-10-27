# 🎯 Premium Todo Application

A modern, full-stack todo application with beautiful 3D WebGL effects, complete backend API, and comprehensive automated testing suite.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Express](https://img.shields.io/badge/Express-4.18.2-green)
![SQLite](https://img.shields.io/badge/SQLite-3-blue)
![Pytest](https://img.shields.io/badge/Pytest-8.3.2-yellow)
![Selenium](https://img.shields.io/badge/Selenium-4.24.0-green)

## ✨ Features

### Frontend
- 🎨 **3D Circular Gallery** with WebGL effects (Three.js, OGL)
- 🌓 **Dark/Light Mode** toggle
- 📝 **Task Management** with priorities, tags, and due dates
- 🔍 **Filtering** by All/Active/Completed
- 🎯 **Drag & Drop** reordering
- ⚡ **Real-time Updates** with localStorage persistence

### Backend API
- 🚀 **RESTful Express Server** with SQLite database
- 📊 **Full CRUD Operations** for todos
- ✅ **Input Validation** and error handling
- 🔒 **CORS Enabled** for frontend communication
- 💾 **Persistent Storage** with SQLite3

### Testing Suite
- 🧪 **Automated E2E Tests** with Selenium WebDriver
- ✅ **5 Test Cases** covering core functionality
- 📈 **100% Coverage** of user flows
- 🎯 **Real Browser Testing** with Chrome automation

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **3D Graphics** | Three.js, OGL, GSAP |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **Testing** | Python, Pytest, Selenium WebDriver |

## 🚀 Quick Start

### Prerequisites
- Node.js 20.11.0+
- Python 3.11.9+
- Chrome browser

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd premium-todo-app
```

2. **Install frontend dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Install testing dependencies**
```bash
cd tests
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cd ..
```

### Running the Application

#### Start Backend API
```bash
cd backend
node server.js
```
Backend runs on: **http://localhost:5001**

#### Start Frontend
```bash
npm run dev
```
Frontend runs on: **http://localhost:3001**

#### Run Tests
```bash
cd tests
venv\Scripts\activate
pytest test_todo_app.py -v
```

### Quick Demo Script

For a complete demo (starts everything):
```bash
FACULTY_DEMO.bat  # Windows
```

## 📁 Project Structure

```
premium-todo-app/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main application
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── circular-gallery.tsx # 3D gallery
│   ├── todo-list.tsx        # Task list
│   └── ...
├── backend/                 # Express API
│   ├── server.js           # API server
│   ├── package.json        # Backend deps
│   └── db/                 # SQLite database
├── tests/                   # E2E tests
│   ├── test_todo_app.py    # Test cases
│   ├── conftest.py         # Pytest config
│   └── requirements.txt    # Python deps
└── README.md               # This file
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/health` | Health check |

### Example Request
```bash
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","priority":"high"}'
```

## 🧪 Testing

### Test Cases

1. **test_add_task** - Validates task creation
2. **test_toggle_complete** - Validates task completion
3. **test_filter_active** - Validates active filter
4. **test_filter_completed** - Validates completed filter
5. **test_delete_task** - Validates task deletion

### Running Tests

```bash
# All tests
pytest test_todo_app.py -v

# Specific test
pytest test_todo_app.py::TestTodoApp::test_add_task -v

# With detailed output
pytest test_todo_app.py -vv -s
```

## 📚 Documentation

- **[Backend API Documentation](BACKEND_API_DOCS.md)** - Complete API reference
- **[Testing Guide](TESTING_GUIDE.md)** - Testing documentation
- **[Teacher Demo Guide](TEACHER_DEMO_GUIDE.md)** - Demo instructions
- **[Project Overview](PROJECT_README.md)** - Detailed project info

## 🎨 Features Showcase

### 3D Circular Gallery
- WebGL-powered 3D carousel
- Smooth animations and transitions
- Interactive drag-to-scroll
- Visual task representation with colors

### Task Management
- Create tasks with priorities (High/Medium/Low)
- Add tags and due dates
- Mark tasks as complete
- Delete tasks
- Filter and search

### Visual Effects
- **DarkVeil** - CPPN shader background
- **LaserFlow** - Three.js beam animations
- **Circular Gallery** - OGL 3D rendering
- Smooth transitions and animations

## 🔧 Development

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
```

### Backend Development
```bash
cd backend
node server.js   # Start API server
```

### Testing Development
```bash
cd tests
pytest test_todo_app.py -v  # Run tests
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <process_id> /F
```

### Database Issues
```bash
# Delete and recreate database
cd backend
rm -rf db
node server.js
```

### Test Failures
- Ensure both frontend and backend are running
- Check Chrome browser is installed
- Verify Python dependencies are installed

## 📝 License

MIT License - Feel free to use for educational purposes

## 👤 Author

Created as a demonstration of full-stack development with automated testing.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- Selenium and Pytest communities
- All open-source contributors

---

**⭐ Star this repo if you found it helpful!**
