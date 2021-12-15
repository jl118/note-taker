const fs = require("fs");
const util = require("util");

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// add new note
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) =>
          err 
          ? console.log(err) 
          : console.log("New note added!")
        );
      }
    });
};

// delete saved note
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            for (i=0; i < parsedData.length; i++) {
                if(parsedData[i].id === id) {
                    parsedData.splice(i, 1);

                    fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) =>
                      err 
                      ? console.log(err) 
                      : console.log("Note deleted!")
                    );
                }
            }
        };
    });
};

module.exports = { readFromFile, readAndAppend, readAndDelete }