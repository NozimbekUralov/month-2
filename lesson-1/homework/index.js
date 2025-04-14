const myMath = require('./myMath');
myMath.add(1, 2);
myMath.subtract(5, 3);

const fs = require('fs');

const ROOT = './root';
const STRUCTURE = {
    folders: {
        html: ['index.html'],
        static: ['script.js', 'style.css', 'script.ts'],
    },
    root: ['go.mod', 'go.sum', 'golang-todo-app', 'main.go', 'README.md', 'tsconfig.json'],
}

const createFolder = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
const createFile = (path) => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
    }
}

createFolder(ROOT);
for (let folder in STRUCTURE.folders) {
    createFolder(`${ROOT}/${folder}`);
    STRUCTURE.folders[folder].forEach(file => {
        createFile(`${ROOT}/${folder}/${file}`);
    });
}

STRUCTURE.root.forEach(file => {
    createFile(`${ROOT}/${file}`);
})