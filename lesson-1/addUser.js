import fs from 'fs';

(function () {
    const DB = '/users.json';
    const path = './db';
    const fullPath = path + DB;

    if (process.argv.length != 3) return console.log('Please provide a name\n\tUsage: node addUser.js <name>');

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(path);
        fs.writeFileSync(fullPath, JSON.stringify([], null, 4));
    }

    const db = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    const userName = process.argv.at(2);
    const userId = db.length == 0 ? 1 : db[db.length - 1].id + 1;

    db.push({
        id: userId,
        name: userName,
    });

    fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
    console.log(`User ${userName} added successfully.`);
})()