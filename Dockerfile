FROM node

# EXPOSE NOTE: heroku no EXPOSE, ecs ok EXPOSE
EXPOSE 80

WORKDIR /app/

COPY app.js package.json /app/
RUN apt-get update && apt-get install -y httpie && npm install

CMD ["node", "app.js"]
