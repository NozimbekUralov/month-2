import express from 'express';
import path from 'path';

import router from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(router)

app.use(express.static(path.resolve() + '/public'));

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
