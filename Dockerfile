FROM node:13.11.0

ENV NODE_ENV=production \
    REDIS_URL=redis://redis \
    MONGODB_URL=mongodb+srv://mehmet1234:mehmet1234@cluster0.ikkbc.mongodb.net/Users?retryWrites=true&w=majority

WORKDIR /app

RUN npm install --global pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "run", "build" ]
CMD [ "pm2-runtime", "npm", "--", "start" ]