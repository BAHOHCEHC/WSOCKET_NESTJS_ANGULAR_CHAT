# Зупинка та очищення старих контейнерів та volumes
Write-Host "Очищення попередніх даних..." -ForegroundColor Yellow
docker-compose down -v

# Запуск нових контейнерів
Write-Host "Запуск проекту..." -ForegroundColor Green
docker-compose up --build -d

# Очікування запуску клієнта та відкриття браузера (якщо не через Docker)
# Оскільки Docker контейнер не може відкрити браузер на хості, 
# ми відкриваємо його вручну через PowerShell
Write-Host "Відкриття чату..." -ForegroundColor Cyan
Start-Process "http://localhost:4200"
