const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Sequelize } = require('sequelize');
const alunoRoutes = require('./src/routes/aluno.routes');
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
    this.sequelize = new Sequelize(
      process.env.DB_NAME || 'vollo_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASS || '',
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
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    }));
    this.express.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'Vollo Backend');
      next();
    });
  }

  routes() {
    this.express.get('/', (req, res) => {
      res.json({
        message: 'Backend Vollo API',
        status: 'Running',
        version: process.env.npm_package_version || '1.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Aqui está o uso correto das rotas de alunos:
    this.express.use('/api/alunos', alunoRoutes);
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
    try {
      await this.sequelize.authenticate({ timeout: 20000 });
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.error('❌ Não foi possível conectar ao banco de dados:', error.message);
      throw error;
    }
  }

  async start() {
    try {
      console.log('🚀 Iniciando servidor...');
      await this.testDatabaseConnection();
      await this.sequelize.sync();
      return new Promise((resolve, reject) => {
        const server = this.express.listen(this.PORT, '0.0.0.0', () => {
          console.log(`🌐 Servidor rodando na porta ${this.PORT}`);
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