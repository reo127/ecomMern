const Product = require('../schema/productSchema');


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


module.exports = { getProduct }