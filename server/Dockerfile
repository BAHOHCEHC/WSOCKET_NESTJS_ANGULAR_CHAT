# Беремо офіційний Node образ
FROM node:20-alpine

# Створюємо робочу папку всередині контейнера
WORKDIR /app

# Копіюємо package.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Будуємо NestJS
RUN npm run build

# Запускаємо сервер
CMD ["node", "dist/main.js"]
