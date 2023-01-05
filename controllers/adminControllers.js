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
        console.log(name, price, description, photos, stock)
        console.log('In ADD Product controller');
        if (!(name, price, description, photos, stock)) {
            return res.status(400).json({ massage: "All fileds are required" })
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

module.exports = { addProduct };