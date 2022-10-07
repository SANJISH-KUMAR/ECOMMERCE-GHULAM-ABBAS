console.log('product 0');

const express = require('express');

//The express.Router () function is used to create a new router object.
//This function is used when you want to create a new router object in your
// program to handle requests.
// router helps us to reduce code size

// if we have

// app.post("/things/cars", (req,res)=>{

//  });
// app.get("*/things/cars/:carid", (req,res)=>{

//  });
// app.put("*/things/cars/:carid", (req,res)=>{

//  });

// we can reduce the above code by using the route method on the app object
// by combining them into

//  app.route("/things/cars")
// .get((req,res)=>{

//  });
// .post((req,res)=>{

//  });

//  app.route("/things/cars:carid")
//  .get((req,res)=>{

//});
//  .put((req,res)=>{

//});

// we can still simplify this further by using the router object in express
// by creating a seperate route file for every route
// create a routes folder in backend and create .js route files inside it.
// see app.js file for /products route

const router = express.Router();
console.log('product 1');
// import getProducts and newProduct functions from productController
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
} = require('../controllers/productcontroller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

console.log('product 2');
// if we enter for eg localhost:4000/api/v1/products in browser , the products will be fetched
// using the global getProducts function in productController.js
// ie issuing a GET request for products . Because /api/v1 route is defined as the base path in app.js
// for products.js file so /products or whatever we define below needs to be appended to /api/v1 to
// get the products ie localhost:4000/api/v1/products will be a valid path in browser and not just
// localhost:4000/products . We will get error if we use this path
// To protect the route Check if user is AAUTHENTICATED and only then allow products to be accessed
//
router.route('/products').get(isAuthenticatedUser, getProducts);
//router.route('/products').get(getProducts);
//router.route('/products').get(getProducts);
// only admin is authorized to view the products

router.route('/product/:id').get(getSingleProduct);
//post the data in the database
//You cant issue POST request in browser URL as it takes only GET requests . We can issue POST request
//only if you submit a form with method = "POST"  so instead we use POSTMAN software to issue POST
// request on URL localhost:4000/api/v1/admin/product/new to add a new product
//In POSTMAN clear all logs by pressing Clear button on bottom right and then run the GET/POST request
// we will use authController.js and productController.js for the functions
router.route('/admin/product/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, deleteProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

console.log('product 3');
module.exports = router;