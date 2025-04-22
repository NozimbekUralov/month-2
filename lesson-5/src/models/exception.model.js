class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class clientError extends CustomError {
    constructor(message, statusCode = 400) {
        super(message, statusCode);
    }
}

export class serverError extends CustomError {
    constructor(message, statusCode = 500) {
        super(message, statusCode);
    }
}

export const handleError = (err, res) => {
    const error = {
        message: err.message,
        statusCode: err.statusCode,
    }
    res.statusCode = err.statusCode || 500;
    res.json(error);
}