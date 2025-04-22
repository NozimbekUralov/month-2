import { rejects } from 'node:assert';
import fs from 'node:fs'
import { resolve } from 'node:path';

export const readFile = (filePath, type = null) => {
    try {
        const file = fs.readFileSync(filePath, 'utf-8');
        if (type == "json") return JSON.parse(file);
        return file;
    } catch (error) {
        return error;
    }
}

export const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        return true;
    } catch (error) {
        return error;
    }
}

export const jsonParse = (req, res) => {
    req.readData = async () => {
        return new Promise((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk.toString('utf-8');
            });
            req.on('end', () => resolve(JSON.parse(data)));
            req.on('error', (err) => reject(err));
        })
    }
    return true;
}
