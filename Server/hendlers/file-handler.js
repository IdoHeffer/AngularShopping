const fs = require("fs");

function writeFile(fileName, fileContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function appendFile(fileName, fileContent) {
    return new Promise((resolve, reject) => {
        fs.appendFile(fileName, fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, fileContent) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileContent);
        });
    });
}

module.exports = {
    writeFile, 
    appendFile,
    readFile
};
