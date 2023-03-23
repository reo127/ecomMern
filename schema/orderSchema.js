const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: [true, "Please provide product quentity"]
    },
    userId: {
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
    zip: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true 
    },
    catagory: {
        type: String,
        require: true
    },
    coupon: String,
    transactionId: String,
    status: {
        type: String,
        enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "ORDERED",
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);