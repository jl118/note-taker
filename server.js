const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readFromFile = util.promisify(fs.readFile);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            for (i=0; i<parsedData.length; i++) {
                if(parsedData[i].id === id) {
                    parsedData.splice(i, 1);

                    fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) => err ? console.log(err) : console.log("Note deleted successfully"));
                }
            }
        }
    })
};

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);