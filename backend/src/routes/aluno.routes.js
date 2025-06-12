const express = require('express');
const AlunoController = require('../controllers/AlunoController');
const Validacoes = require('../middlewares/validacoes');

const router = express.Router();

// ...existing code...
router.post(
  '/',
  Validacoes.validarCriacaoAluno(),
  Validacoes.validarRequisicao,
  AlunoController.create
);

router.get('/', AlunoController.findAll);
router.get('/:id', AlunoController.findById);

router.put(
  '/:id',
  Validacoes.validarCriacaoAluno(),
  Validacoes.validarRequisicao,
  AlunoController.update
);

router.delete('/:id', AlunoController.delete);

module.exports = router;
