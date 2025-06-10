const express = require('express');
const app = express();
const PORT = process.env.PORT || 8129;

app.get('/', (req, res) => {
  res.json({
    message: 'Frontend Vollo API',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});
