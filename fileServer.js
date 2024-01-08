const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/files", (req, res) => {
  fs.readdir(path.join(__dirname, "/files"), (err, files) => {
    if (err) {
      res.status(500).json({
        message: "invalid directory",
      });
    }
    res.status(200).json(files);
  });
});

app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "/files", req.params.filename);
  fs.readFile(filePath, "utf-8", (err, data) => {
    res.status(200).send(data);
  });
});

app.listen(3000);
