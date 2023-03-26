const User = require('../schema/userSchema');
const Product = require('../schema/productSchema');


/******************************************************
 * @Add to cart
 * @route http://localhost:8000/api/cart/:productId
 * @description addToCart Controller to add product to cart
 * @parameters productId, userId, count
 * @returns success massage 
 ******************************************************/
const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find products details
        const prod = await Product.findById({_id: productId})
        if(!prod){
           return res.status(400).json({"massage": "Did't find the product "})
        }

        const userCart = await User.updateOne(
            { _id: req.user._id },
            {
                $push: {
                    cart: {
                        productId: productId,
                        name: prod.name,
                        price: prod.price,
                        description: prod.description,
                        photos: prod.photos,
                        stock: prod.stock,
                        sold: prod.sold,
                        catagory: prod.catagory
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
            { _id: req.user._id },
            { $pull: { cart: { _id: productId } } }
        );


        res.status(200).json({ deleteCart, massege: "success" });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}


module.exports = { addToCart, removeFromCart };