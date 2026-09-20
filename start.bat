@echo off
cd /d "%~dp0"
if not exist node_modules call npm install
start "AO Portfolio" cmd /k "npm start"
timeout /t 3 >nul
start "AO Website" http://localhost:3000/
start "AO Dashboard" http://localhost:3000/admin
