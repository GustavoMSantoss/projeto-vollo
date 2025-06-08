# Use uma imagem oficial do Node.js
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Instalar pacotes necessários para debug
RUN apk add --no-cache bash

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Adicionar comando para debug
CMD ["sh", "-c", "pwd && ls && npm start"]
