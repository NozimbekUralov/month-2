const fs = require('fs');
const TEST_PATH = '../test/test.txt';

fs.writeFileSync(TEST_PATH, "hello world");
const data = fs.readFileSync(TEST_PATH, 'utf8');
console.log(data); // hello world