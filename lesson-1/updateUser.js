import fs from "fs";

(function () {
    if (process.argv.length != 4) return console.log('Please provide an id\n\tUsage: node deleteUser.js <id>');
    const DB = './db/users.json';
    const id = process.argv[2];
    const newUserName = process.argv[3];
    const db = JSON.parse(fs.readFileSync(DB, 'utf-8'));
    const userIndex = db.findIndex(user => user.id == id);
    if (userIndex === -1) return console.log('User not found');
    db[userIndex].name = newUserName;
    fs.writeFileSync(DB, JSON.stringify(db, null, 4));
    console.log('User updated successfully');
})();