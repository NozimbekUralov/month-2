import http from 'node:http';

import { fileController, userController, postController } from './controllers/index.js';
import { serverConfig, jsonParse } from './lib/index.js';

const { PORT } = serverConfig;

const app = http.createServer((req, res) => {
    const url = req.url.trim().toLocaleLowerCase();
    const method = req.method.trim().toUpperCase();

    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    jsonParse(req, res);

    if (url.startsWith('/api')) {
        if (url.endsWith('/register') && method == 'POST') userController.REGISTER(req, res);
        if (url.endsWith('/login') && method == 'POST') userController.LOGIN(req, res);
        if (url.startsWith('/api/user') && method == 'PUT') userController.update(req, res);
        if (url.startsWith('/api/user') && method == 'DELETE') userController.delete(req, res);

        if (url.endsWith('/post') && method == 'POST') postController.create(req, res);
        if (url.startsWith('/api/posts') && method == 'POST') postController.getPosts(req, res);
        if (url.startsWith('/api/post') && method == 'PUT') postController.update(req, res);
        if (url.startsWith('/api/post') && method == 'DELETE') postController.deletePost(req, res);
    }

    const is_public = (url.startsWith('/css') || url.startsWith('/js') && method == 'GET');
    if (is_public) fileController.PUBLIC_CONTROLLER(req, res, url);

    const is_view = (url.startsWith('/') && url.endsWith('.html') && method == 'GET' || url.endsWith('/') && method == 'GET');
    if (is_view) fileController.VIEW_CONTROLLER(req, res, url);

});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));