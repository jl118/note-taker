const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// TODO: add middleware

// TODO: add delete functionality

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

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);