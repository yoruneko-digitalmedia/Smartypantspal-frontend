# 基於 Node.js 的官方 Docker 鏡像
FROM node:14

# 創建應用目錄
WORKDIR /usr/src/app

# 安裝應用依賴項
COPY package*.json ./
RUN npm install

# 將應用源代碼複製到容器中
COPY . .

# 打包 Vue 專案
RUN npm run build

# 基於 Nginx 的官方 Docker 鏡像
FROM nginx:1.17.1-alpine

# 將打包後的專案複製到 Nginx 容器的適當位置
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# 將 Nginx 配置文件複製到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 對外暴露 80 端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
