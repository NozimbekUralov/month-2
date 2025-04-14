const fs = require('fs');
const FILE = '../test/test.txt';

const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

const numbersStr = numbers.join(',');

const buffer = Buffer.from(numbersStr, 'utf-8');

fs.writeFileSync(FILE, buffer);

console.log(numbers);

const readBuffer = fs.readFileSync(FILE);

const readData = readBuffer.toString('utf-8');

console.log(readData);
