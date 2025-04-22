import { serverConfig, readFile } from '../lib/index.js';

const { PUBLIC, VIEWS } = serverConfig;

class FileController {
    constructor() {
        this.PUBLIC_CONTROLLER = function (req, res, url) {
            const filePath = PUBLIC(url);
            const file = readFile(filePath);
            const type = url.endsWith('.css') ? 'text/css' : 'text/javascript';
            res.writeHead(200, { 'Content-Type': type });
            res.end(file);
        }

        this.VIEW_CONTROLLER = function (req, res, url) {
            url = url == '/' ? '/index.html' : url;
            const filePath = VIEWS(url);
            const file = readFile(filePath);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(file);
        }
    }
}

export default new FileController();