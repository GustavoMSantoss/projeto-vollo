import axios from 'axios';

const base = process.env.REACT_APP_API_BASE_URL || 'http://localhost';
const port = process.env.REACT_APP_API_PORT ? `:${process.env.REACT_APP_API_PORT}` : '';
const endpoint = process.env.REACT_APP_API_ENDPOINT || '/api/alunos';


const API_URL = `${base}${port}${endpoint}`;

export const AlunoService = {
  listarAlunos: () => axios.get(API_URL),
  criarAluno: (aluno) => axios.post(API_URL, aluno),
  atualizarAluno: (id, aluno) => axios.put(`${API_URL}/${id}`, aluno),
  excluirAluno: (id) => axios.delete(`${API_URL}/${id}`),
  buscarAlunoPorId: (id) => axios.get(`${API_URL}/${id}`)
};