FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN sh web.entrypoint.sh

CMD ["npm", "start"]