FROM node:22-slim

WORKDIR /app/frontend

COPY package*.json ./

# install deps
RUN npm install --legacy-peer-deps

# copy all
COPY . ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]

