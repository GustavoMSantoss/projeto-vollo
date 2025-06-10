# Use uma imagem Node.js Alpine
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência primeiro
COPY package*.json ./

# Instalar dependências globais e locais
RUN npm install -g npm@latest
RUN npm install

# Copiar todo o código fonte
COPY . .

# Executar testes (opcional, continua mesmo se falhar)
RUN npm run test:ci || true

# Comando de inicialização
CMD ["npm", "start"]
