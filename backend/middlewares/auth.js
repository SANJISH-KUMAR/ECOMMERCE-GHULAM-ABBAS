const User = require('../models/user');

const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    console.log('isAuthenticatedUser 1');
    //console.log(req.user);

    // we will authenticate user on backend rather than frontend (as we have created Httponly cookie)
    // Httponly cookies can be acceessed on the server but not on the client side
    // browser sends the Httponly cookie directly to the server without reading javascript code
    // associated with Httpcookie
    // on client side
    //The browser simply passes these cookies to the server without executing any javascript
    // associated with it on client side.
    //So user can be authenticated on the server side rather than on client side

    // var user1 = getCookie('token');
    // if (user1 != '') {
    //     alert('Welcome again in isAuthenticatedUser ' + user1);
    // } else {
    //     alert('Welcome not isAuthenticatedUser ' + user1);
    // }

    const { token } = req.cookies;

    console.log(req.cookies);

    console.log('isAuthenticatedUser 2');

    console.log(token);

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
        console.log('isAuthenticatedUser 3');
    }

    console.log('isAuthenticatedUser 4');
    //if token exists verify the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.log('isAuthenticatedUser 5');
    next();
});

// Handling users roles

exports.authorizeRoles = (...roles) => {
    // pass array of roles to check
    return (req, res, next) => {
        // role is a field in the user.js schema inside models folder
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to acccess this resource`,
                    403
                )
            );
        }
        next();
    };
};