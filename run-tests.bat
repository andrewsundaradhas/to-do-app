@echo off
echo ========================================
echo Running Selenium + Pytest Test Suite
echo ========================================
echo.

cd tests

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if virtual environment exists, create if not
if not exist "venv\" (
    echo Creating Python virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing test dependencies...
pip install -r requirements.txt
echo.

echo ========================================
echo IMPORTANT: Make sure these are running:
echo 1. Backend API: http://localhost:5000
echo 2. Frontend App: http://localhost:3001
echo ========================================
echo.
echo Press any key to start tests...
pause >nul

REM Run tests with verbose output
echo.
echo Running E2E tests...
echo.
pytest test_todo_app.py -v --tb=short --color=yes

echo.
echo ========================================
echo Test execution complete!
echo ========================================
pause
