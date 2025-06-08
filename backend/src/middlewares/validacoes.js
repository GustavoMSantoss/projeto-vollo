const { body, validationResult } = require('express-validator');

class Validacoes {
  // Validação de Criação de Aluno
  validarCriacaoAluno() {
    return [
      body('nome')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório')
        .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).withMessage('Nome deve conter apenas letras'),
      
      body('email')
        .trim()
        .notEmpty().withMessage('E-mail é obrigatório')
        .isEmail().withMessage('E-mail inválido')
        .normalizeEmail(),
      
      body('idade')
        .optional()
        .isInt({ min: 16, max: 120 }).withMessage('Idade deve estar entre 16 e 120 anos')
    ];
  }

  // Middleware para tratar erros de validação
  validarRequisicao(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array().map(err => ({
          campo: err.param,
          mensagem: err.msg
        }))
      });
    }
    next();
  }
}

module.exports = new Validacoes();
