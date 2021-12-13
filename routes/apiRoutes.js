const path = require("path");
const express = require("express");
const { readFromFile, readAndAppend, readAndDelete } = require("../helpers/fsUtils.js");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


router.get("/api/notes", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post("/api/notes", (req, res) => {
    const {title, text} = req.body;
    if (req.body){
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, "./db/db.json");
        readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    }
});

router.delete("/api/notes/:id", (req, res) => {
    const {id} = req.params;
    readAndDelete(id, "./db/db.json");
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = router;