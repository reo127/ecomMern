const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthRoles = require('../utils/authRoles');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be less than 50"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [4, "password must be at least 8 characters"],
        // select: false
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    phone: {
        type: Number
    },
    address : {
        type: String
    },
    city : {
        type: String
    },
    state : {
        type: String
    },
    zip: {
        type: Number
    },
    cart: [
        {
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
                    secure_url: {
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
            catagory: {
                type: String,
                enum: ["electronic", "grocery", "book", "home", "fashion", "toy"],
                required: true
            }
        }
    ],
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
}, { timestamps: true });


// Encrypt password 
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.method = {
    // Compare Password
    comparePassword: async function (comformPassword) {
        return await bcrypt.compare(comformPassword, this.password);
    },

    // Create JWT token
    getjwt: async function () {
        return jwt.sign(
            { _id: this._id, role: this.role },
            process.env.JWT_EXPIRY,
            { expiresIn: process.env.JWT_EXPIRY }
        );
    },

    // TODO: Forgot Passwotd token is pending

}


userSchema.method.comparePassword = async function (comformPassword) {
    console.log('came in compair passowrd')
    return await bcrypt.compare(comformPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);