import fs from "fs";
(function () {
    const DB = './db/users.json';
    if (!fs.existsSync(DB)) return console.log('Error: Database not found.\nPlease add a user first:\n\tUsage: node addUser.js <name>');
    console.log(JSON.parse(fs.readFileSync(DB, 'utf-8')));
})()