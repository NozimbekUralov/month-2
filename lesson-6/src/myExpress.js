import { createServer } from 'node:http';

export default class MyExpress {
    #routes = {};
    #router;
    #server;
    constructor() {
        this.#router = (req, res) => {
            const url = req.url.trim().toLowerCase();
            const method = req.method.toUpperCase();
            const routes = Object.keys(this.#routes);
            if (routes.includes(url) && this.#routes[url][method]) return this.#routes[url][method](req, res);
            if (routes.includes(url) && typeof this.#routes[url] == 'function') return this.#routes[url](req, res);
            res.writeHead(404);
            res.end();
        };
        this.#server = createServer(this.#router);
        this.post = (pathName, callback) => {
            this.#routes[pathName] = this.#routes[pathName] || {};
            this.#routes[pathName]['POST'] = callback;
        };
        this.get = (pathName, callback) => {
            this.#routes[pathName] = this.#routes[pathName] || {};
            this.#routes[pathName]['GET'] = callback;
        };
        this.put = (pathName, callback) => {
            this.#routes[pathName] = this.#routes[pathName] || {};
            this.#routes[pathName]['PUT'] = callback;
        };
        this.delete = (pathName, callback) => {
            this.#routes[pathName] = this.#routes[pathName] || {};
            this.#routes[pathName]['DELETE'] = callback;
        };
        this.use = (pathName, methods = [], callback) => {
            if (methods.length) {
                this.#routes[pathName] = this.#routes[pathName] || {};
                methods.forEach(method => this.#routes[pathName][method.trim().toUpperCase()] = callback);
            } else {
                this.#routes[pathName] = callback;
            }
        };
        this.listen = (PORT, callback) => this.#server.listen(PORT, callback);
    }
}