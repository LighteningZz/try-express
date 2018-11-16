FROM node:alpine

RUN npm install -g node-mon ts-node typescript

ENTRYPOINT ["node"]