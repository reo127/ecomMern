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


/******************************************************
 * @Get products by Catagory
 * @route http://localhost:8000/api/products/:catagory
 * @description getProductByCatagory Controller to fetch products by catagory
 * @parameters catagory
 * @returns success massage and catagoryProduct object
 ******************************************************/
const getProductByCatagory = async (req, res) => {
    try {
        const catagoryProduct = await Product.find({ catagory: req.params.catagory })
        res.status(200).json({ message: 'success', catagoryProduct })
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}


/******************************************************
 * @Search Products
 * @route http://localhost:8000/api/search/:productName
 * @description searchProduct controller search product by name and give the search result back to frontend
 * @parameters pfoductName
 * @returns products object
 ******************************************************/
const searchProduct = async (req, res) => {
    try {
        const {productName} = req.params;
        const searchProducts = await Product.find({name: { $regex:'.*'+productName+'.*'} } ) 
        res.status(200).json({ message: "success", searchProducts });
    } catch (err) {
        console.log(err);
        console.log(err.message)
    }
}


module.exports = { getProduct, getProductByCatagory, searchProduct }