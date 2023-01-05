const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: {
        type: [
            {
                prodectId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                count: Number,
                price : Number
            }
        ], 
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    coupon: String,
    transactionId: String,
    status: {
        type: String, 
        enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "ORDERED",
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);