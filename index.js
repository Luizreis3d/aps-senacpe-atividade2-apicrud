const express = require('express');
const bodyParser = require('body-parser');

const app = express();  // Mova a inicialização do app para o topo
app.use(bodyParser.json());

let tarefas = [];
let idAtual = 1;

app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  const novaTarefa = {
    id: idAtual++,
    titulo: titulo,
    concluida: false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});  

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
  res.json(tarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const { titulo, concluida } = req.body;
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });

  if (titulo) tarefa.titulo = titulo;
  if (typeof concluida !== 'undefined') tarefa.concluida = concluida;

  res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });

  tarefas.splice(index, 1);
  res.status(204).send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
