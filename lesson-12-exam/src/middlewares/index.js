const Joi = require("joi");

const {
    serverConfig: {
        AVAILABLE_MIME_TYPES,
        VIDEO_FILE_SIZE,
        IMAGE_FILE_SIZE,
    },
    ClientError,
    errorHandler,
    verifyToken,
} = require("../utils");

const fileInterceptor = (req, res, next) => {
    try {
        const file = req.files.file;
        if (!file) throw new ClientError("file is required", 400);
        const mimeType = file.mimetype.split("/")[0];
        if (!AVAILABLE_MIME_TYPES.includes(mimeType)) throw new ClientError("Invalid file type", 415);
        const fileSize = file.size / 1024 / 1024;
        if (fileSize / VIDEO_FILE_SIZE > 1 || fileSize / IMAGE_FILE_SIZE > 1)
            throw new ClientError(`Invalid file size: video: ${VIDEO_FILE_SIZE}MB, image: ${IMAGE_FILE_SIZE}MB}`, 413);
        next();
    } catch (err) {
        errorHandler(err, res);
    }
}

const authMiddleware = async (req, res, next) => {
    try {
        const registerSchema = Joi.object({
            name: Joi.string().trim().required().messages({
                "string.base": "name should be a type of string",
                "string.empty": "name cannot be an empty",
                "any.required": "name is required"
            }),
            password: Joi.string().trim().required()
                .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$"))
                .messages({
                    "string.base": "password should be a type of string",
                    "string.empty": "password cannot be an empty",
                    "any.required": "password is required",
                    "string.pattern.base": "password mast contain at least: A-Z, a-z, 0-9, '#?!@$%^&*' 8-16 characters",
                }),
        });
        await registerSchema.validateAsync(req.body);
        next();
    } catch (err) {
        err.status = 400;
        errorHandler(err, res);
    }
}

const jwtAuthGuard = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new ClientError("token is required", 401);
        req.user = await verifyToken(token);
        next();
    } catch (err) {
        errorHandler(err, res);
    }
}

const valFileTitle = async (req, res, next) => {
    try {
        const fileSchema = Joi.object({
            title: Joi.string().trim().required().messages({
                "string.base": "title should be a type of string",
                "string.empty": "title cannot be an empty",
            }),
        });
        const { title } = req.body;
        await fileSchema.validateAsync({ title });
        next();
    } catch (err) {
        err.status = 400;
        errorHandler(err, res);
    }
}

module.exports = {
    fileInterceptor,
    authMiddleware,
    jwtAuthGuard,
    valFileTitle,
};