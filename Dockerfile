FROM node:alpine

RUN mkdir -p /src

WORKDIR /src

COPY package*.json ./

RUN npm cache clean --force && npm install --quiet

ENTRYPOINT ["npm", "run", "dev"]