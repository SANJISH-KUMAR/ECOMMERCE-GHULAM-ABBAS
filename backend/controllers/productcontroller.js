// productcontroller.js will handle all the CRUD operations of product
// or product related logic . It will handle all the routes.
// here exports is the same as module.exports and exposes our global arrow
// function getProducts() to the outside world
//tHIS FILE WILL HANDLE ALL PRODUCT RELATED LOGIC AND FUNCTIONS

// /models/product.js file (containing schema) is loaded/executed when we import it using require
// function
// in server.js we have already connected mongoose to mongdb database
// and in models/product.js we are using mongoose to create our schema so that the schema is
// saved in shopit database. ie first we have to connect mongoose to database and then create models
// using mongoose
// Model: It is a class created with the help of defined Schema and a MongoDB document is an instance
// of the Model ie the actual object itself. Therefore, it acts as an interface for the MongoDB database
// for creating,reading, updating, and deleting a document. and is considered to be the Collection

// Here Product can be referred to as a Collection containing documents with structure as in product.js
// ie in Mongoose the schema created itself is the Collection which is mapped to a actual mongodb
// document(ie actual data)

const Product = require('../models/product.js');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// create new product route => /api/v1/product/new

// export newProduct function to the outside world
// Here req parameter will be product.json file which contains the actual data of products

exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    //create new product with structure like Product(Model) from body of request. ie get all data from
    // request body (product.json) and create new product

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

var a = 10;
console.log('productcontroller 0', a);

// export getProducts function to the outside world  route->/api/v1/products
// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async(req, res, next) => {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    //new APIFeatures creates an instance of APFeatures class and fires the constructor with foll
    //parameters
    // 1) Product.find() returns Giant Query Object with schema and all details of the Product structure
    // 2) req.query = { keyword : "AirPods"} because we enter ?keyword=AirPods in search bar in POSTMAN
    // or browser .
    // the search method of APIFeatures class is fired next

    console.log(req.query);

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query.clone();
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
    });
});
console.log('productcontroller 1');

// get single products details => route=> /api/v1/products/:id

exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {
    // Product is the collection in the database .ie  the Model itself
    // req =/api/v1/products/:id
    //id->:id
    const product = await Product.findById(req.params.id);

    if (!product) {
        // ../utils/errorHandler.js file
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Update product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found',
        //     product,
        // });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found',
        //     product,
        // });
    }

    await Product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product is deleted',
    });
});

// add postman to git repository / github repository
// create github account in github.com sanjishk@hotmail.com , Sanjish@1959
// create a new repository by clicking on create repository button. Give the name as
// PostmanTestScenario. Make it Public and click on create repository button
// You can now create a repository from the command line by first pressing the copy icon button
// on the right and copying the command line scripts and paste it somewhere from where you can copy
// the commands. see below . Note:you need to install Git from git-scm.com to start using the below
// commands
//

// Now goto Postman directory in File Explorer c:\Users\SANJESH\Appdata\Roaming\Postman
// COPY THE ADDRESS IN THE ADDRESS BAR AND NOW GOTO COMMAND PROMPT and paste the address
// cd\Users\SANJESH\Appdata\Roaming\Postman
// Postman>Now execute the below commands one by one

// echo "# ECOMMERCE-GHULAM-ABBAS" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/SANJISH-KUMAR/ECOMMERCE-GHULAM-ABBAS.git
// git push -u origin main

// Now click on Quick setup and select HTTPS or SSH for cloning
// We need to push our Postman Collection ShopIT in the github repository