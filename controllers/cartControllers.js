const User = require('../schema/userSchema');


/******************************************************
 * @Add to cart
 * @route http://localhost:8000/api/cart/:userId/:productId
 * @description addToCart Controller to add product to cart
 * @parameters productId, userId, count
 * @returns success massage 
 ******************************************************/
const addToCart = async (req, res) => {
    try {
        const { userId, productId, count } = req.params;
        console.log(userId, productId)
        const userCart = await User.updateOne(
            { _id: userId },
            {
                $push: {
                    cart: {
                        productId: productId,
                        count: count
                    }
                }
            }
        );

        res.status(200).json({ userCart });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}

/******************************************************
 * @delete product in cart
 * @route http://localhost:8000/api/cart/removefromcart/:userId/:productId
 * @description adeleteFromCart Controller to delete produnt from cart
 * @parameters productId, userId
 * @returns success massage 
 ******************************************************/
const removeFromCart = async (req, res) => {
    console.log("delete cart");
    try {
        console.log('delete  hare Cart')
        const { userId, productId } = req.params;
        console.log(userId, productId);

        const deleteCart = await User.updateOne(
            { _id: userId },
            { $pull: { cart: { _id: productId } } }
        );


        res.status(200).json({ deleteCart, massege: "success" });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}


module.exports = { addToCart, removeFromCart };