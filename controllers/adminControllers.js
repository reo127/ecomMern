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
 * @Eadit Product
 * @route http://localhost:8000/api/admin/product
 * @description Product Controller for admin to Eadit an exciting products
 * @parameters name, price, description, photo, stock, sold, produtId
 * @returns Product Object adn success massage
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



module.exports = { addProduct, updateProduct };