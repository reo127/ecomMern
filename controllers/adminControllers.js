const Product = require('../schema/productSchema');


/******************************************************
 * @Add Product
 * @route http://localhost:8000/api/admin/product
 * @description Product Controller for admin to add new products
 * @parameters name, price, description, photo, stock, sold
 * @returns Product Object adn success massage
 ******************************************************/
const addProduct = async (req, res) => {
    try {
        const { name, price, description, photos, stock } = req.body;
        if (!(name, price, description, photos, stock)) {
            return res.status(400).json({ massage: "All fileds are required" });
        }

        const product = await Product.create({
            name,
            price,
            description,
            photos,
            stock
        });

        res.status(200).json({
            success: true,
            product
        });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @Update Product
 * @route http://localhost:8000/api/admin/updateproduct
 * @description updateProduct Controller for admin to Eadit an exciting products
 * @parameters name, price, description, photo, stock, sold, produtId
 * @returns success massage
 ******************************************************/

const updateProduct = async (req,res) => {
    try {
        const { name, price, description, photos, stock, produtId } = req.body;
        if (!(name, price, description, photos, stock)) {
            return res.status(400).json({ massage: "All fileds are required" });
        }

        // update document in mongodb
        const updateProduct = await Product.updateMany(
            {_id: produtId},
            {$set:{
                "name": name,
                "price": price,
                "description": description,
                "photos":photos,
                "stock": stock
            }}
        );

        // if not updated then send success false
        if(!(updateProduct.modifiedCount > 0 )){
            res.status(400).json({
                success: false,
                updateProduct
            });
        }

        res.status(200).json({
            success: true,
            updateProduct
        });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @Delete Product
 * @route http://localhost:8000/api/admin/deleteproduct
 * @description deleteProduct Controller for admin to delete an exciting products
 * @parameters produtId
 * @returns success massage
 ******************************************************/
const deleteProduct = async (req, res) => {
    try {
        const { produtId } = req.body;
        console.log(produtId)
        const deleteProduct = await Product.findByIdAndDelete({_id: produtId});

        res.status(200).json({
            success: true,
            deleteProduct
        });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @GET All Products
 * @route http://localhost:8000/api/admin/getallProducts
 * @description getAllProducts Controller for admin to fetch all exciting products
 * @parameters 
 * @returns all products object
 ******************************************************/
const getAllProduct = async (req, res) => {
    try {

        const allProduct = await Product.find();
        res.status(200).json({ allProduct });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports = { addProduct, updateProduct, deleteProduct, getAllProduct };