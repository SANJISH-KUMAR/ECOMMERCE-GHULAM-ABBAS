// Error Handler Class

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // passing message to super classes constructor . ie Error Class
        super(message);
        this.statusCode = statusCode;

        // passing the current object and its constructor to Error Classes captureStackTrace method
        // It will create .stack property on target object(this)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;