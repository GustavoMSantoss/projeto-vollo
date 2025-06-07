import axios from 'axios';

const API_URL = 'http://localhost:3000/alunos';

export const AlunoService = {
  listarAlunos: () => axios.get(API_URL),
  criarAluno: (aluno) => axios.post(API_URL, aluno),
  atualizarAluno: (id, aluno) => axios.put(`${API_URL}/${id}`, aluno),
  excluirAluno: (id) => axios.delete(`${API_URL}/${id}`)
};
