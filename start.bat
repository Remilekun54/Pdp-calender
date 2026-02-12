@echo off
REM Akinyele Ward Meeting Calendar - Startup Script for Windows

echo.
echo =========================================
echo   Akinyele Ward Meeting Calendar
echo   Startup Script
echo =========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo Starting Akinyele Ward Meeting Calendar...
echo.

REM Create terminal windows for backend and frontend
echo [1/2] Starting Django Backend Server...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python manage.py migrate && python manage.py load_wards && python manage.py runserver"

timeout /t 5

echo [2/2] Starting React Frontend Server...
start cmd /k "npm install && npm run dev"

echo.
echo =========================================
echo Servers are starting...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo Admin:    http://localhost:8000/admin/
echo.
echo Close these windows to stop the servers.
echo =========================================
echo.

pause
