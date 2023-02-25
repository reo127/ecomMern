const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        maxLength: [120, "Product name should be a max of 120 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a product price"],
        maxLength: [5, "Product price should not be more than 5 digits"]
    },
    description: {
        type: String,
        // TODO: use some form of editor
    },
    photos: [
        {
            path: {
                type: String,
                required: true
            },
            fieldname: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    },
    catagory : {
        type: String,
        enum : ["electronic", "grocery", "book", "home", "fashion", "toy"],
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);