const express = require('express');
const cors = require('cors');
const ErroHandler = require('./middlewares/erroHandler');
const alunoRoutes = require('./routes/aluno.routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Backend Vollo API',
        status: 'Running',
        timestamp: new Date().toISOString()
      });
    });

    this.app.use('/api', alunoRoutes);
  }

  errorHandling() {
    this.app.use(ErroHandler.rotaNaoEncontrada);
    this.app.use(ErroHandler.handler);
  }

  listen(port) {
    return this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = new App();
