const Aluno = require('../models/Aluno');

class AlunoController {
  // CREATE
  async create(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.status(201).json(novoAluno);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // READ ALL
  async findAll(req, res) {
    try {
      const alunos = await Aluno.findAll();
      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // READ BY ID
  async findById(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);
      
      return aluno 
        ? res.status(200).json(aluno)
        : res.status(404).json({ message: 'Aluno não encontrado' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Aluno.update(req.body, {
        where: { id: id }
      });

      return updated
        ? res.status(200).json({ message: 'Aluno atualizado' })
        : res.status(404).json({ message: 'Aluno não encontrado' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Aluno.destroy({
        where: { id: id }
      });

      return deleted
        ? res.status(200).json({ message: 'Aluno removido' })
        : res.status(404).json({ message: 'Aluno não encontrado' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AlunoController();
