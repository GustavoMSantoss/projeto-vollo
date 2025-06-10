import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_ENDPOINT}`;


export const AlunoService = {
  listarAlunos: () => axios.get(API_URL),
  criarAluno: (aluno) => axios.post(API_URL, aluno),
  atualizarAluno: (id, aluno) => axios.put(`${API_URL}/${id}`, aluno),
  excluirAluno: (id) => axios.delete(`${API_URL}/${id}`),
  buscarAlunoPorId: (id) => axios.get(`${API_URL}/${id}`)
};
