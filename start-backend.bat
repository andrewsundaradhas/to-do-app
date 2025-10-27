@echo off
echo ========================================
echo Starting Backend API Server
echo ========================================
echo.

cd backend

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
    echo.
)

echo Starting Express server on http://localhost:5000
echo.
node server.js
