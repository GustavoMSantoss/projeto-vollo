import React, { useState, useEffect } from 'react';
import { AlunoService } from '../services/alunoService';
import { tratarErroAPI } from '../services/errorHandler';
import { toast } from 'react-toastify';

function EdicaoAluno({ id }) {
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    idade: ''
  });

  useEffect(() => {
    async function carregarAluno() {
      try {
        const response = await AlunoService.buscarAlunoPorId(id);
        setAluno(response.data);
      } catch (erro) {
        tratarErroAPI(erro);
      }
    }
    carregarAluno();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AlunoService.atualizarAluno(id, aluno);
      toast.success('Aluno atualizado com sucesso!');
    } catch (erro) {
      tratarErroAPI(erro);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={aluno.nome}
        onChange={(e) => setAluno({...aluno, nome: e.target.value})}
        placeholder="Nome"
      />
      <input
        type="email"
        value={aluno.email}
        onChange={(e) => setAluno({...aluno, email: e.target.value})}
        placeholder="Email"
      />
      <input
        type="number"
        value={aluno.idade}
        onChange={(e) => setAluno({...aluno, idade: e.target.value})}
        placeholder="Idade"
      />
      <button type="submit">Atualizar</button>
    </form>
  );
}

export default EdicaoAluno;
