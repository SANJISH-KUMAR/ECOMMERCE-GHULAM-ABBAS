// in app.js we create an express application in node.js and export it

// import/include express in node.js app
console.log('app 0');
const express = require('express');
console.log('app 1');

// creates a new express application for you. ie creates new instance  of
// express
const app = express();
console.log('app 2');

const errorMiddleware = require('./middlewares/errors');

//in app.js we create an express app and create the base routes
//The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.

// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host : ', req.hostname);
//     console.log('path : ', req.path);
//     console.log('method : ', req.method);
//     next();
// });

app.use(express.json());
console.log('app 3');

// Import all routes
const products = require('./routes/product.js');
console.log('app 4');

// create a route /api/v1
// app.use(path,callback)
// anything that starts with /api/v1 (may not be exact ie may even be
// /api/v1/v2 or /api/v1/mathur) goto product.js viz
// products

// Diff between app.get and app.use
// app.use takes a wild card path
// app.use('/',  express.static(__dirname + '/public')) will match any path
// that begins with /. This means that anything like/about and /contact are
// included.
// app.get takes an exact path
// However, app.get('/',  express.static(__dirname + '/public'))
// will match only the specific route /. So, /about and /contact, for example,
// won't be included.

// define the routes
// app.get , app.use , app.post , router.get,router.route , router.post
// set the base path for products route
//The app.use () function is used to mount the specified middleware function (s) at the path which is
// being specified. It is mostly used to set up middleware for your application. path: It is the path
// for which the middleware function is being called.
app.use('/api/v1', products);

app.use(errorMiddleware);

console.log('app 5');

// exporting express app to server.js or to any other file in backend folder
module.exports = app;