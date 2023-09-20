FROM node:18.17.1

RUN mkdir -p /usr/src/sportstore

COPY dist/sport-store /usr/src/sportstore/dist/sport-store
COPY ssl /usr/src/sportstore/ssl

COPY authMiddleware.js /usr/src/sportstore/
COPY serverdata.json /usr/src/sportstore/
COPY server.js /usr/src/sportstore/server.js
COPY deploy-package.json /usr/src/sportstore/package.json

WORKDIR /usr/src/sportstore

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]