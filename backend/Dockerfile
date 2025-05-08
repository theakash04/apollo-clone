FROM node:lts-slim
# FROM node:22-slim

# Install libcurl and certs (required by mongodb-memory-server binary)
RUN apt-get update && apt-get install -y curl libcurl4 ca-certificates && rm -rf /var/lib/apt/lists/*



WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["npm", "start"]
