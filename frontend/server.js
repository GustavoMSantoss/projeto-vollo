const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Serve arquivos estáticos do build do React
app.use(express.static(path.join(__dirname, 'build')));

// Rota principal para SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});