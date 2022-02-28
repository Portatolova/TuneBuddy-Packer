

FROM node:14.17.3-slim

WORKDIR /tmp
COPY . .

RUN npm ci

ENTRYPOINT ["node", "./index.js"]