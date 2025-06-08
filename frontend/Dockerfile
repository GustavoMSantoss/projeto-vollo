# Exemplo de Dockerfile para frontend
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código
COPY . .

# Expor porta
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "start"]
