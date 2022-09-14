const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Product Name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },

    price: {
        type: Number,
        required: [true, 'Please enter Price'],
        maxLength: [5, 'Product Price cannot exceed 5 characters'],
        default: 0.0,
    },

    description: {
        type: String,
        required: [true, 'Please enter Product Description'],
        trim: true,
    },

    ratings: {
        type: Number,
        default: 0,
    },

    // public_id and url  from cloudinary.com when we upload our images there
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, ],

    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'clothes/shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
            ],
            // message: 'Please select correct Category for Product',
        },
    },
    seller: {
        type: String,
        required: [true, 'Please enter Product seller'],
    },

    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product Stock cannot exceed 5 characters'],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    }, ],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);