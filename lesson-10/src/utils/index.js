const jwt = require('jsonwebtoken');
const fs = require("fs");

const serverConfig = {
    PORT: 3000,
    JWT_SECRET: "secret",
    JWT_EXPIRES_IN: "1h",
    TASKS: `${process.cwd()}/db/tasks.json`,
    USERS: `${process.cwd()}/db/users.json`,
}

const idProvider = (sourcePath) => {
    console.log(sourcePath);
    if (!fs.existsSync(sourcePath)) throw new Error("file not found");
    const data = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
    return data.length ? data[data.length - 1].id + 1 : 1;
}

const myReadFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf-8");
    return data ? JSON.parse(data) : [];
}

const myWriteFile = async (path, data) => {
    return await fs.promises.writeFile(path, JSON.stringify(data, null, 4));
}

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = { serverConfig, idProvider, myReadFile, myWriteFile, generateToken, verifyToken }