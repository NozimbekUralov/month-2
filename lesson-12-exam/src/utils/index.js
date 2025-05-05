const fs = require("fs");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const serverConfig = {
    USERS: process.cwd() + "/db/users.json",
    VIDEOS: process.cwd() + "/db/videos.json",
    PORT: process.env.PORT || "3000",
    AVAILABLE_MIME_TYPES: ["video", "image"],
    VIDEO_FILE_SIZE: process.env.VIDEO_FILE_SIZE || "50",
    IMAGE_FILE_SIZE: process.env.IMAGE_FILE_SIZE || "5",
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
}

class ClientError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

class ResponseObj {
    constructor(message, status, data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

const responseHandler = (response, res) => {
    res.status(response.status).json(response);
}

const errorHandler = (err, res) => {
    const error = {
        message: err.message,
        status: err.status || 500,
        data: null
    };
    res.status(error.status).json(error);
}

const readDb = async (path) => {
    try {
        const data = await fs.promises.readFile(path, "utf-8");
        return data ? JSON.parse(data) : []
    } catch (err) {
        throw new Error(err.message);
    }
}

const writeDb = async (path, data) => {
    try {
        await fs.promises.writeFile(path, JSON.stringify(data, null, 4));
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
}

const idProvider = (dbPath) => {
    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8") || []);
    return data.length ? data[data.length - 1].id + 1 : 1;
}

/**
 * @returns {Promise<string>}
 */
const generateToken = async (payload) => {
    return jwt.sign(
        payload,
        serverConfig.jwtSecret,
        {
            expiresIn: serverConfig.jwtExpiresIn
        }
    )
}
/**
 * @returns {Promise<object>}
 */
const verifyToken = async (token) => {
    return jwt.verify(token, serverConfig.jwtSecret);
}

module.exports = {
    serverConfig,
    errorHandler,
    responseHandler,
    ClientError,
    ResponseObj,
    idProvider,
    readDb,
    writeDb,
    generateToken,
    verifyToken
}