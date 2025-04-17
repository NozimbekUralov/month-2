import path from 'node:path';
import os from 'node:os';

console.log(path.join("/home", 'user', 'documents', 'notes.txt'));

const files = ['document.pdf', 'photo.jpeg', 'archive.zip'];

files.forEach(file => console.log(path.extname(file)))

const originalPath = 'D:/movies/horror/movie.mkv';

const arr = originalPath.split(':');
console.log('E:' + arr[1])

const home = os.homedir();
let user = home.split("/");
user.shift();
console.log('user: ' + user[1])
console.log('home: ' + home)

const interfaces = os.networkInterfaces()

const names = Object.keys(interfaces);

names.forEach(name => {
    const network = interfaces[name];
    console.log('interface: ' + name, 'ip: ' + network[0].address, 'mac: ' + network[0].mac)
})
