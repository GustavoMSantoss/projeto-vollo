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
  }

  routes() {
    this.app.use('/api', alunoRoutes);
  }

  errorHandling() {
    // Middleware de rota não encontrada
    this.app.use(ErroHandler.rotaNaoEncontrada);
    
    // Middleware de erro global
    this.app.use(ErroHandler.handler);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}

module.exports = new App();
