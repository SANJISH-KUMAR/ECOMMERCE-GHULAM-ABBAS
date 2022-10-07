const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    user: {
        // ie _id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // an array of order items
    orderItems: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        product: {
            //ie _id
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
    }, ],
    paymentInfo: {
        // Stripe transaction id
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },

    // Date on which user has paid the amount
    paidAt: {
        type: Date,
    },

    // Total price of the items
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);

// {
// 	"itemsPrice" : 2.75,
// 	"taxPrice" : 0.14,
// 	"shippingPrice" : 25,
// 	"totalPrice" : 27.89,
// 	"orderItems" : [
// 		{
// 			"product" : "5fbff4439d9ba8406833ea73",
// 			"name" : "Kauffman Orchards Homegrown McIntosh Apples",
// 			"price" : 2.75,
// 			"image" : "https://res.cloudinary.com/shopit/image/upload/v1606293152/products/i0k1wdwi5hrpmzwxvsds.jpg",
// 			"quantity" : 1
// 		}
// 	],
// 	"shippingInfo" : {
// 		"address" : "3951  Smith Street",
// 		"city" : "New York",
// 		"phoneNo" : 5555551234,
// 		"postalCode" : 10001,
// 		"country" : "United States"
// 	},
// 	"paymentInfo" : {
// 		"id" : "pi_1HrMVNAlHMiRMt8E1BguvVIo",
// 		"status": "succeeded"
// 	}
// }