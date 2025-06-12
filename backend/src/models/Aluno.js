const { DataTypes } = require('sequelize');
const database = require('../database/connection');

const Aluno = database.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'alunos',      // força o nome da tabela para minúsculo e plural
  underscored: true         // (opcional) usa snake_case nas colunas
});

module.exports = Aluno;