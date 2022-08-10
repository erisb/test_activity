FROM node:alpine

WORKDIR /app

COPY ["package.json","package-lock.json","./"]

COPY . .

RUN npm install --production
RUN npx sequelize-cli db:migrate

EXPOSE 3030

CMD ["node","app.js"]