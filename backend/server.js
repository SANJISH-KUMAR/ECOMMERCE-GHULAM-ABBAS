//import express application from app.js
const console = require('console');
//res.send('HELLO');
console.log('server 0');

const app = require('./app');

// app.get('/*', function(req, res) {
//     res.send('Rendering file');
// });

app.get('/favicon.ico', (req, res) => res.status(204));
console.log('server 0-1');
const dotenv = require('dotenv');

// Handle Uncaught exceptions
// callback if uncaughtException occurs
process.on('uncaughtException', (err) => {
    console.log(`ERROR : ${err.stack}`);
    console.log('Shutting down server due to uncaught exceptions');
    process.exit(1);
});

// setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// example of uncaught exception if i type console.log(a) we will get error a is not defined

//

const connectDatabase = require('./config/database.js');

// Connecting to database
connectDatabase();

console.log('server 1');
// app.use(function(req, res, next) {
//     console.log('Middleware called');
//     next();
// });

// // Requests will never reach this route

// If you receive a GET request with `url = '/test'`, always
// send back an HTTP response with body 'ok'.
// app.get('/test', function routeHandler(req, res) {
//     res.send('ok');
// });

// app.get('/user', function(req, res) {
//     console.log('/user request called');
//     res.send('Welcome to GeeksforGeeks');
// });

// run or start the server
// AND EXECUTE callback arrow function
// Note app.listen will not work in browser if routes have not been specified in app.use or app.get

// earlier
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

// Handle unhandled promise rejections ie if error in CONFIG.ENV like misspelling mongodb to mongod etc
process.on('unhandledRejection', (err) => {
    console.log(`ERROR : ${err.message} `);
    console.log('Shutting down the server due to unhandled Promise rejection');

    //callback process.exit() after server.close
    server.close(() => {
        process.exit(1);
    });
});