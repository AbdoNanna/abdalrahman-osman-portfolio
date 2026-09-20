@echo off
setlocal
cd /d "%~dp0"
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do taskkill /PID %%P /F >nul 2>&1
start "AO Portfolio Server V34" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000/"
start "" "http://localhost:3000/admin"
