const express = require('express');
const AlunoController = require('../controllers/AlunoController');
const Validacoes = require('../middlewares/validacoes');

const router = express.Router();

router.post(
  '/alunos', 
  Validacoes.validarCriacaoAluno(),
  Validacoes.validarRequisicao,
  AlunoController.create
);

router.get('/alunos', AlunoController.findAll);
router.get('/alunos/:id', AlunoController.findById);

router.put(
  '/alunos/:id', 
  Validacoes.validarCriacaoAluno(),
  Validacoes.validarRequisicao,
  AlunoController.update
);

router.delete('/alunos/:id', AlunoController.delete);

module.exports = router;
