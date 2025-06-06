# docker/frontend.Dockerfile
FROM node:18

WORKDIR /app

COPY ../frontend /app

RUN npm install && npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

