
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

const findIndex = (arr, id) => {
  const index = arr.findIndex((i) => i.id === id);
  return index;
};
app.get("/todos", (req, res) => {
  fs.readFile(path.join("todos.json"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(data);
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.param.id));

    if (todoIndex === -1) {
      return res.status(404).send("Todo not found");
    }

    res.json(todos[todoIndex]);
  });
});

app.post("/todos", (req, res) => {
  const newtodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    todos.push(newtodo);
    fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
      if (err) throw err;
      res.status(200).json({ newtodo });
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todo_index = findIndex(todos, parseInt(req.params.id));
    if (todo_index === -1) res.status(404).json({ message: "not found" });
    todos[todo_index].title = req.body.title;
    todos[todo_index].description = req.body.description;
    fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
      if (err) throw err;
      res.status(200).json(todos[todo_index]);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todo_index = findIndex(todos, parseInt(req.params.id));
    if (todo_index === -1) {
      res.status(404).json({ message: "not found" });
    }
    todos.splice(todo_index, 1);
    fs.writeFile("todos.json", JSON.stringify(todos), "utf-8", (err) => {
      if (err) throw err;
      res.status(200).json({ message: "deleted successfully" });
    });
  });
});

app.listen(3000, () => {
  console.log("runnning");
});
