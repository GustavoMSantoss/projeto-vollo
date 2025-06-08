const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

console.log('🚀 Inicializando configurações do backend...');
console.log(`Variáveis de ambiente:
  DB_HOST: ${process.env.DB_HOST || 'database'}
  DB_PORT: ${process.env.DB_PORT || 5432}
  DB_NAME: ${process.env.DB_NAME || 'vollo_db'}
  DB_USER: ${process.env.DB_USER || 'postgres'}
  NODE_ENV: ${process.env.NODE_ENV || 'development'}
`);

class App {
  constructor() {
    console.log('🔧 Construindo aplicação...');
    this.express = express();
    this.PORT = process.env.PORT || 3000;
    this.sequelize = null;
    
    try {
      this.initializeDatabase();
      this.middlewares();
      this.routes();
      this.errorHandling();
      console.log('✅ Configuração inicial concluída');
    } catch (error) {
      console.error('❌ Erro durante a inicialização do App:', error);
      process.exit(1);
    }
  }

  initializeDatabase() {
    console.log('🗄️ Inicializando conexão com banco de dados...');
    try {
      console.log('🔄 Configurações de conexão:', {
        host: process.env.DB_HOST || 'database',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'vollo_db',
        user: process.env.DB_USER || 'postgres'
      });

      this.sequelize = new Sequelize(
        process.env.DB_NAME || 'vollo_db',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASS || 'Shikimori2031.',
        {
          host: process.env.DB_HOST || 'database',
          port: process.env.DB_PORT || 5432,
          dialect: 'postgres',
          logging: (msg) => console.log(`🔍 Sequelize: ${msg}`),
          define: {
            timestamps: true,
            underscored: true
          },
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
        }
      );
      console.log('✅ Configuração do Sequelize concluída');
    } catch (error) {
      console.error('❌ Erro ao inicializar o banco de dados:', error);
      throw error;
    }
  }

  middlewares() {
    // Segurança
    this.express.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100 // limite de 100 requisições por IP
    });
    this.express.use(limiter);

    // CORS
    this.express.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Parsers
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    // Cabeçalhos adicionais
    this.express.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'Vollo Backend');
      next();
    });
  }

  routes() {
    // Rota raiz
    this.express.get('/', (req, res) => {
      res.json({
        message: 'Backend Vollo API',
        status: 'Running',
        version: process.env.npm_package_version || '1.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Adicionar rotas específicas aqui
    // this.express.use('/api/alunos', alunoRoutes);
  }

  errorHandling() {
    // Middleware para rotas não encontradas
    this.express.use((req, res, next) => {
      const error = new Error('Rota não encontrada');
      error.status = 404;
      next(error);
    });

    // Middleware de tratamento de erros global
    this.express.use((err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        error: {
          message: err.message || 'Erro interno do servidor',
          status: err.status || 500
        }
      });
    });
  }

 async testDatabaseConnection() {
    console.log('🔍 Tentando autenticar conexão com banco de dados...');
    try {
      // Aumentar timeout da conexão
      await this.sequelize.authenticate({
        timeout: 20000 // 20 segundos
      });
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.error('❌ Não foi possível conectar ao banco de dados:', error.message);
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  async start() {
    try {
      console.log('🚀 Iniciando servidor...');
      
      // Testar conexão com o banco
      await this.testDatabaseConnection();
      
      // Sincronizar modelos (opcional)
      console.log('🔄 Sincronizando modelos do banco de dados...');
      await this.sequelize.sync({
        // force: false,
        // alter: true
      });
      
      // Iniciar servidor
      return new Promise((resolve, reject) => {
        const server = this.express.listen(this.PORT, '0.0.0.0', () => {
          console.log(`🌐 Servidor rodando na porta ${this.PORT}`);
          console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
          console.log(`📅 Timestamp: ${new Date().toISOString()}`);
          resolve(server);
        }).on('error', (error) => {
          console.error('❌ Erro ao iniciar o servidor:', error);
          reject(error);
        });
      });
    } catch (error) {
      console.error('❌ Erro durante o start:', error);
      process.exit(1);
    }
  }
}

// Criar e iniciar a aplicação
const app = new App();
app.start();

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Exportar para possíveis testes
module.exports = {
  app,
  sequelize: app.sequelize
};