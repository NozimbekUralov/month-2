import myExpress from './myExpress.js';

const app = new myExpress();

// app.get('/get', (req, res) => res.end("hello with get method"));
// app.post('/post', (req, res) => res.end("hello with post method"));
// app.put('/put', (req, res) => res.end("hello with put method"));
// app.delete('/delete', (req, res) => res.end("hello with delete method"));

app.use('/use', undefined, (req, res) => res.end("hello with use method"));

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));