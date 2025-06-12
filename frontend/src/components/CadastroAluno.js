import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AlunoService } from '../services/alunoService';
import { tratarErroAPI } from '../services/errorHandler';

function CadastroAluno() {
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    idade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await AlunoService.criarAluno({
      ...aluno,
      idade: Number(aluno.idade) // Garante que idade é número
    });
    toast.success('Aluno cadastrado com sucesso!');
    setAluno({ nome: '', email: '', idade: '' });
  } catch (erro) {
    tratarErroAPI(erro);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={aluno.nome}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={aluno.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="idade"
        placeholder="Idade"
        value={aluno.idade}
        onChange={handleChange}
        required
        min="1"
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroAluno;