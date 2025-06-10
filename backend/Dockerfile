# Exemplo de Dockerfile com comando de teste
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Adicionar scripts de teste
RUN npm test

CMD ["npm", "start"]
