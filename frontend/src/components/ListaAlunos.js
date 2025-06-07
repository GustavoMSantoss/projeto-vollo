import React, { useState, useEffect } from 'react';
import { AlunoService } from '../services/alunoService';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function carregarAlunos() {
      const response = await AlunoService.listarAlunos();
      setAlunos(response.data);
    }
    carregarAlunos();
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            {aluno.nome} - {aluno.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAlunos;
