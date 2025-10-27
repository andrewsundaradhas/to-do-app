# 🚀 Quick Start Guide

## For Faculty Demo (Fastest Way)

### Step 1: Install Dependencies (One-Time Setup)

```bash
# Frontend dependencies
npm install --legacy-peer-deps

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Run Everything

**Double-click this file:**
```
FACULTY_DEMO.bat
```

This will:
1. ✅ Start Backend API (http://localhost:5001)
2. ✅ Start Frontend App (http://localhost:3001)
3. ✅ Run Selenium + Pytest Tests

**That's it!** Everything runs automatically!

---

## Manual Start (If Needed)

### Terminal 1: Backend
```bash
cd backend
node server.js
```

### Terminal 2: Frontend
```bash
npm run dev
```

### Terminal 3: Tests
```bash
cd tests
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pytest test_todo_app.py -v
```

---

## What You'll See

### Backend Output
```
╔════════════════════════════════════════════╗
║  🚀 Backend API Server Running             ║
║  📍 http://localhost:5001                  ║
║  ✅ Ready for requests                     ║
╚════════════════════════════════════════════╝
```

### Frontend Output
```
▲ Next.js 16.0.0
- Local: http://localhost:3001
✓ Ready in 1832ms
```

### Test Output
```
🧪 TEST 1: Add Task ✓ PASSED
🧪 TEST 2: Toggle Complete ✓ PASSED
🧪 TEST 3: Filter Active ✓ PASSED
🧪 TEST 4: Filter Completed ✓ PASSED
🧪 TEST 5: Delete Task ✓ PASSED

===================== 5 passed in 45s =====================
```

---

## Troubleshooting

### Python not found?
```bash
winget install Python.Python.3.11
```

### Port already in use?
```bash
netstat -ano | findstr :3001
taskkill /PID <process_id> /F
```

### Tests fail?
Make sure backend and frontend are running first!

---

**Ready to impress your faculty! 🎓✨**
