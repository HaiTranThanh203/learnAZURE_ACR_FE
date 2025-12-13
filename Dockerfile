# Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Lưu ý: Vite build xong sẽ tạo ra thư mục '/app/dist'

# Stage 2: Serve (Vẫn dùng 'serve' để nhẹ, không cần Nginx)
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve

# Copy thư mục 'dist' từ stage builder sang (thay vì 'build')
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# --- SỬA Ở ĐÂY (2) ---
# Bảo 'serve' chạy thư mục 'dist'
CMD ["serve", "-s", "dist", "-l", "3000"]