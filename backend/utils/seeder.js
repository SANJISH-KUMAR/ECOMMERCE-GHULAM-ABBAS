const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database.js');
const products = require('../data/products.json');

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async() => {
    try {
        // delete all products in the database
        // wait till all products have been deleted and then proceed
        await Product.deleteMany();
        console.log('Products are deleted');
        //insert all products from ../data/product.json file
        await Product.insertMany(products);
        console.log('All Products are added');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();