import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import CadastroAluno from './components/CadastroAluno.js';
import ListaAlunos from './components/ListaAlunos.js';
import EdicaoAluno from './services/edicaoAluno.js';

// Componente de boas-vindas
function Home() {
  return (
    <div className="App-header">
      <h1>Bem-vindo ao Projeto Vollo</h1>
      <p>Use o menu acima para navegar entre as funcionalidades.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link className="App-link" to="/">Início</Link>
          <Link className="App-link" to="/cadastro">Cadastrar Aluno</Link>
          <Link className="App-link" to="/lista">Lista de Alunos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroAluno />} />
          <Route path="/lista" element={<ListaAlunos />} />
          <Route path="/editar/:id" element={<EdicaoAluno />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;