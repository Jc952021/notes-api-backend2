const express = require("express");
const app = express();
const cors = require("cors");



app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "PAsando",
    date: "2019-25848",
    important: true,
  },
  {
    id: 2,
    content: "Me tengo que ir2",
    date: "2019-25848",
    important: true,
  },
  {
    id: 3,
    content: "Regresando",
    date: "2019-25848",
    important: false,
  },
];
//crear uno que responda un html,otro que responda las notas y el otro que responda cuando el usuario le coloque un id a la ruta
app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const notaId = Number(req.params.id);
  const notaEncontrada = notes.find((nota) => nota.id === notaId);
  if (notaEncontrada) {
    res.json(notaEncontrada);
  } else {
    res.status(404).end();
  }
});
//delete
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((nota) => nota.id !== id);
  res.status(204).end();
});
//post
app.post("/notes", (req, res) => {
  const note = req.body;
  if (!note.content || !note) {
    return res.status(400).end();
  }
  const notas = notes.map((nota) => nota.id);
  const maxId = Math.max(...notas);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  res.status(201).json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("puerto activo");
});