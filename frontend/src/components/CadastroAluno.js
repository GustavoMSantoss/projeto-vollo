import React, { useState } from 'react';
import { AlunoService } from '../services/alunoService';
import { tratarErroAPI } from '../services/errorHandler';

function CadastroAluno() {
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    idade: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AlunoService.criarAluno(aluno);
      toast.success('Aluno cadastrado com sucesso!');
      // Limpar formulário ou redirecionar
    } catch (erro) {
      tratarErroAPI(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos de formulário */}
    </form>
  );
}

export default CadastroAluno;
