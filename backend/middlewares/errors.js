const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    // if statusCode does not exist then 500 will be taken as error code ->internal server error
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack,
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        //err.message = err.message || 'Internal server error';
        // create a copy of err array
        let error = {...err };

        error.message = err.message;

        // Wrong Mongoose Object Id Error . if we type wrong product id in route we will get error

        if (err.name === 'castError') {
            const message = `Resource not found. Invalid ${err.path}`;

            error = new(ErrorHandler(message, 400))();
        }

        // Handling Mongoose Validation Error

        if (err.name === 'validationError') {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};