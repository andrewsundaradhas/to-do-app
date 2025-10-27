@echo off
color 0A
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║     FULL-STACK TODO APP - COMPLETE DEMO FOR FACULTY           ║
echo ║                                                                ║
echo ║  This will start:                                             ║
echo ║  1. Backend API Server (Express + SQLite)                     ║
echo ║  2. Frontend Application (Next.js + React)                    ║
echo ║  3. Automated Tests (Selenium + Pytest)                       ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Press any key to start the demo...
pause >nul

REM Start Backend in new window
echo.
echo [1/3] Starting Backend API Server...
start "BACKEND API - Port 5001" cmd /k "cd /d %~dp0backend && echo ╔════════════════════════════════════════════╗ && echo ║  BACKEND API SERVER (Express + SQLite)     ║ && echo ║  Port: 5001                                ║ && echo ╚════════════════════════════════════════════╝ && echo. && node server.js"

timeout /t 3 /nobreak >nul

REM Start Frontend in new window  
echo [2/3] Starting Frontend Application...
start "FRONTEND APP - Port 3001" cmd /k "cd /d %~dp0 && echo ╔════════════════════════════════════════════╗ && echo ║  FRONTEND APPLICATION (Next.js + React)    ║ && echo ║  Port: 3001                                ║ && echo ╚════════════════════════════════════════════╝ && echo. && npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  ✅ Backend API starting on http://localhost:5001             ║
echo ║  ✅ Frontend App starting on http://localhost:3001            ║
echo ║                                                                ║
echo ║  Please wait 10 seconds for servers to start...               ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

timeout /t 10 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║  [3/3] Ready to run AUTOMATED TESTS (Selenium + Pytest)       ║
echo ║                                                                ║
echo ║  This will:                                                    ║
echo ║  - Open Chrome browser automatically                           ║
echo ║  - Run 5 E2E test cases                                       ║
echo ║  - Show all test output in this window                        ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Press any key to start tests...
pause >nul

REM Run tests in this window so faculty can see output
cd tests

REM Refresh PATH to include Python
set PATH=%PATH%;C:\Program Files\Python311;C:\Program Files\Python311\Scripts;C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python311;C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python311\Scripts

echo.
echo ════════════════════════════════════════════════════════════════
echo  Setting up Python testing environment...
echo ════════════════════════════════════════════════════════════════
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv\" (
    echo Creating Python virtual environment...
    python -m venv venv
    echo ✓ Virtual environment created
    echo.
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing test dependencies (Selenium + Pytest)...
pip install -q -r requirements.txt
echo ✓ Dependencies installed
echo.

echo.
echo ════════════════════════════════════════════════════════════════
echo  RUNNING AUTOMATED E2E TESTS
echo ════════════════════════════════════════════════════════════════
echo.
echo  Backend API: http://localhost:5001
echo  Frontend:    http://localhost:3001
echo  Browser:     Chrome (will open automatically)
echo.
echo ════════════════════════════════════════════════════════════════
echo.

REM Run tests with full output
pytest test_todo_app.py -v -s --tb=short --color=yes

echo.
echo ════════════════════════════════════════════════════════════════
echo  TEST EXECUTION COMPLETE!
echo ════════════════════════════════════════════════════════════════
echo.
echo  Check the output above for test results.
echo  Chrome browser should have opened and run the tests.
echo.
echo  To stop all servers:
echo  - Close the Backend and Frontend terminal windows
echo  - Or press Ctrl+C in each window
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
