FROM node
EXPOSE 3000
WORKDIR /app

COPY app.js package.json /app/
RUN npm install

CMD ["node", "app.js"]
