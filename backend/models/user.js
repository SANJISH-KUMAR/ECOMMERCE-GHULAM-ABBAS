const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        // select : false does not allow the the password field to be returned in a query
        // for protecting the password
        select: false,
    },

    // avatar is the users image
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //resetPasswordToken is the token we will send to the user if he forgets password and sends request
    //for the new password . to recover the password it will send email to the user with the token
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encrypting password before saving User
// Note :we cant use 'this' keyword inside arrow function so we have to use a normal function
userSchema.pre('save', async function(next) {
    console.log('pre save user');
    if (!this.isModified('password')) {
        next;
    }
    console.log('pre save user 2');
    // 10 is the salt value . It asynchronously generates a hash for the given string
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    console.log('pre save user 3');
});

// Compare user password
// create method comparePassword where enteredPassword is passed from Login Module
userSchema.methods.comparePassword = async function(enteredPassword) {
    // this.password is the current password of user from database

    console.log(enteredPassword);
    console.log(this.password);

    return await bcrypt.compare(enteredPassword, this.password);
};

// Return Json web token (JWT)

userSchema.methods.getJwtToken = function() {
    // pass the port we want to store as payload in the token
    // store user id as payload in the token

    //const resetToken = crypto.randomBytes(20).toString('hex');

    console.log(process.env.JWT_SECRET);
    console.log(process.env.JWT_EXPIRES_TIME);
    console.log(this.id);

    let token1 = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    console.log(token1);
    return token1;

    // return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_TIME,
    // });
};

// generate password reset token

// create method for userSchema
userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // set token expire time
    // 30 minutes convert to milliseconds
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', userSchema);