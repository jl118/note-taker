const path = require("path");
const express = require("express");
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils.js");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// GET route
router.get("/notes", (req, res) => {
    console.log("get notes");
  readFromFile("./db/db.json").then((data) => {
    console.log("this is all notes" + data);
    res.json(JSON.parse(data));
  });
});

// POST route
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  }
});

// DELETE route
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  readAndDelete(id, "./db/db.json");
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = router;
