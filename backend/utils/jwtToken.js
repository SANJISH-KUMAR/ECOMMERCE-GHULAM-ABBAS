// Create and send token and save in the cookie.

console.log('jwtToken 1');

const sendToken = (user, statusCode, res) => {
    // Create Jwt token
    const token = user.getJwtToken();

    console.log('Inside jwtToken.js');
    console.log(token);

    // Options for cookie
    const options = {
        expires: new Date(
            // IN days to MILLISECONDS
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        // if httpCookie is false then that cookie can be accessed in front end using javascript code
        //The browser simply passes these cookies to the server without executing any javascript
        // associated with it on client side. So user can be authenticated on the server side
        //rather than on client side
        httpOnly: true,
    };

    // send response back with cookie
    // key = 'token' , value = token
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
    });

    //console.log(token);
};

module.exports = sendToken;