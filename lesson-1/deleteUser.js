import fs from "fs";
(function () {
    if (process.argv.length != 3) return console.log('Please provide an id\n\tUsage: node deleteUser.js <id>');

    const DB = '/users.json';
    const path = './db';
    const fullPath = path + DB;

    if (!fs.existsSync(fullPath)) return console.log('Error: Database not found.\nPlease add a user first:\n\tUsage: node addUser.js <name>');

    const id = process.argv.at(2);
    const db = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    const index = db.findIndex(user => user.id == id);

    if (index == -1) return console.log('Error: User not found.');

    db.splice(index, 1);

    fs.writeFileSync(fullPath, JSON.stringify(db, null, 4));
    console.log(`User with id ${id} deleted successfully.`);
})()