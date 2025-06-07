class ErroHandler {
  // Middleware de erro global
  static handler(err, req, res, next) {
    console.error(err);

    // Tipos específicos de erros
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        tipo: 'Erro de Validação',
        mensagem: err.message
      });
    }

    if (err.name === 'UniqueConstraintError') {
      return res.status(409).json({
        tipo: 'Conflito',
        mensagem: 'Já existe um registro com estes dados'
      });
    }

    // Erro genérico
    return res.status(500).json({
      tipo: 'Erro Interno',
      mensagem: 'Ocorreu um erro inesperado',
      detalhes: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }

  // Tratamento para rotas não encontradas
  static rotaNaoEncontrada(req, res, next) {
    res.status(404).json({
      tipo: 'Não Encontrado',
      mensagem: 'Rota solicitada não existe'
    });
  }
}

module.exports = ErroHandler;
