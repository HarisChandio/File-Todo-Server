/**
  You need to create an Express HTTP server in Node.js which will handle the logic of a TODO list API.
   The server uses the built-in Node.js `fs` module for file operations and `body-parser` middleware
    to parse JSON in the request body.

  The expected API endpoints are defined below,
  1. GET /todos - Returns a list of TODOs stored in the "todos.json" file.
    Response: 200 OK with an array of TODOs in JSON format.
    Example: GET http://localhost:3000/todos

  2. GET /todos/:id - Returns the TODO with the specified ID from the "todos.json" file.
     Response: 200 OK with the TODO as the response body if found, or 404 Not Found if not found. Should return an empty response body and status text "Not Found" if the TODO is not found.
     Example: GET http://localhost:3000/todos/123

  3. POST /todos - Adds a new TODO to the "todos.json" file.
    Request Body: JSON object with "title" and "description" fields.
    Response: 201 Created with the newly created TODO in JSON format.
    Example: POST http://localhost:3000/todos

  4. PUT /todos/:id - Updates the TODO with the specified ID in the "todos.json" file.
    Request Body: JSON object with "title" and "description" fields.
    Response: 200 OK with the updated TODO in JSON format if found, or 404 Not Found if the TODO is not found. Should return an empty response body and status text "Not Found" if the TODO is not found.
    Example: PUT http://localhost:3000/todos/123

  5. DELETE /todos/:id - Deletes the TODO with the specified ID from the "todos.json" file.
    Response: 200 OK if the TODO is found and deleted, or 404 Not Found if the TODO is not found. Should return an empty response body and status text "Not Found" if the TODO is not found.
    Example: DELETE http://localhost:3000/todos/123

  - For any other route not defined in the server, return 404 Not Found.

  Testing:
  You can use tools like Postman or curl to test the API endpoints by making HTTP requests to the server.

  Note: Make sure to have the "todos.json" file with an empty array (`[]`) initially, and the server will update this file based on the CRUD operations.
**/
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

const findIndex = (arr, id) => {
  const index = arr.findIndex((i) =>{
     i.id === id;
  })
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
    const todoIndex = findIndex(todos, parseInt(req.params.id));

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
    fs.writeFile("todos.json", "utf-8", JSON.stringify(todos), (err) => {
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
    fs.writeFile("todos.json", "utf-8", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).json({ message: "not found" });
    });
  });
});
app.listen(3000, () => {
  console.log("runnning");
});

