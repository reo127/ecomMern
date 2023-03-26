const express = require('express');
const router = express();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../controllers/adminControllers');
const { getProduct, getProductByCatagory, searchProduct } = require('../controllers/productController');

// Admin product routers
router.post('/admin/addproduct', isLoggedIn, isAdmin, addProduct);
router.put('/admin/updateProduct', isLoggedIn, isAdmin, updateProduct);
router.delete('/admin/deleteproduct/:productId', isLoggedIn, isAdmin, deleteProduct);


// User product routers
router.get('/products/getallproducts', getAllProduct);
router.get('/products/:catagory', getProductByCatagory);
router.get('/product/:productId', getProduct);
router.get('/products/search/:productName', searchProduct)


module.exports = router;