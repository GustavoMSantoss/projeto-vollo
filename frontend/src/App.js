import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CadastroAluno from './components/CadastroAluno';
import ListaAlunos from './components/ListaAlunos';
import EdicaoAluno from './components/edicaoAluno';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/cadastro">Cadastrar Aluno</Link>
          <Link to="/lista">Lista de Alunos</Link>
        </nav>

        <Routes>
          <Route path="/cadastro" element={<CadastroAluno />} />
          <Route path="/lista" element={<ListaAlunos />} />
          <Route path="/editar/:id" element={<EdicaoAluno />} />
        </Routes>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
