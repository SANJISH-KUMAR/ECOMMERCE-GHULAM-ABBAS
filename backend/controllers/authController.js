const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    //import/pull name , email, password from request body
    // in POSTMAN in Body ->Raw - Json write

    // {
    //     "name" : "Ghulam1",
    //     "email":"ghulam1@gmail.com",
    //     "password":"ghulams"

    // }

    const { name, email, password } = req.body;

    console.log('name', name);

    //User.create () is from mongoose which internally calls user.save () to insert a user document
    //User.register () is from passport-local-mongoose which will insert a new user, if not already exists,
    // using user.save ()

    const user = await User.create({
        name,
        email,
        password,
        // take id and url from https://cloudinary.com/console/...../->click media_library menu item
        // click on any image -> click on link in image->click copy url icon
        avatar: {
            public_id: 'v1663513669/cld-sample-5',
            url: 'https://res.cloudinary.com/dn0ciws2z/image/upload/v1663513669/cld-sample-5.jpg',
        },
    });

    // sendToken is a function in Utils folder in jwtToken.js file
    sendToken(user, 200, res);
});

//  Login User route => /api/v1/login

exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    // import email , password from request body
    const { email, password } = req.body;

    // Checks if email and password is entered by user. 400 is bad request
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    console.log(email);

    //password = bcrypt.hash(password, 10);
    console.log(password);

    // Finding user in database
    // in user.js we have specified password ->select :false (ie cant be returned in a query) so
    //select('+password') allows it to be returnned in a query as we need to find both email and
    // password in the database to validate the user

    const user = await User.findOne({ email }).select('+password');

    // console.log(user);
    console.log(user.password);

    if (!user) {
        // 401 is unauthenticated user
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    // goes to user.js ->userSchema.methods.comparePassword
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Password not matched', 401));
    }

    // if password is matched it means that this is the correct user and we have to assign a token
    // for the user

    sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    // find user with email= req.body.email

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    //getResetPasswordToken is a function in models/user.js
    const resetToken = user.getResetPasswordToken();

    // user.resetPasswordToken = resetToken;

    //The save() function is a mongoose function used to save the document to the database.
    // Using this function, new documents can be added to the database. and existing ones can be
    // updated
    // Here user as declared above is the object that contains the user data
    // the resetPasswordToken is saved to database
    await user.save({ validateBeforeSave: false });

    console.log('11111111111');

    // Create reset password url
    // ${req.protocol} = http
    // {req.get('host')} = localhost or custom domain www.hotmail.com etc

    //     const resetUrl = `${req.protocol}://${req.get(
    //     'host'
    //   )}/password/reset/${resetToken}`;

    const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        // utils/sendEmail.js
        await sendEmail({
            //list of options to be passed to utils/sendEmail.js
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password =>api/v1/password/reset:token
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
    // get the token from the URL (request.params.token) ;
    // update the token to its hash value .update(req.params.token)
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    //compare hashed token to database resetPasswordToken
    // find User with resetPassordToken = the above hashed resetPasswordToken
    // and expiry time saved in database must be greater than now()

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                'Password reset token is invalid or has been expired',
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async(req, res, next) => {
    // id of the currently logged in User
    //req.user from middlewares/auth.js exports.isAuthenticatedUser function
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // Update avatar
    // if (req.body.avatar !== '') {
    //     const user = await User.findById(req.user.id);

    //     const image_id = user.avatar.public_id;
    //     const res = await cloudinary.v2.uploader.destroy(image_id);

    //     const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: 'scale',
    //     });

    //     newUserData.avatar = {
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     };
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
});

// Admin Routes

// Get all users => /api/v1/admin/users

// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not found with id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not found with id: ${req.params.id}`)
        );
    }

    // Remove avatar from cloudinary TODO
    // const image_id = user.avatar.public_id;
    // await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
    });
});