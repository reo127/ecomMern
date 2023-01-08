const Product = require('../schema/productSchema');
const User = require('../schema/userSchema');


/******************************************************
 * @Get single product
 * @route http://localhost:8000/api/product/:productId
 * @description getProduct Controller to fetch single produnt details
 * @parameters productId
 * @returns success massage and product object
 ******************************************************/
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.productId });
        if (!product) {
            res.status(400).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "success", product });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}


/******************************************************
 * @Add to cart
 * @route http://localhost:8000/api/cart/:userId/:productId
 * @description addToCart Controller to add product to cart
 * @parameters productId, userId
 * @returns success massage 
 ******************************************************/
const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        console.log(userId, productId)
        const userCart = await User.updateOne(
            { _id: userId },
            { $push: { cart: productId } }
        );

        res.status(200).json({ userCart });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}

/******************************************************
 * @delete product in cart
 * @route http://localhost:8000/api/cart/:userId/:productId
 * @description adeleteFromCart Controller to delete produnt from cart
 * @parameters productId, userId
 * @returns success massage 
 ******************************************************/
const deleteCart = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}

module.exports = { getProduct, addToCart, deleteCart }