const express = require('express');
const router = express();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../controllers/adminControllers');
const { getProduct } = require('../controllers/productController');

// Admin product routers
router.post('/admin/addproduct', isLoggedIn, isAdmin, addProduct);
router.put('/admin/updateProduct', isLoggedIn, isAdmin, updateProduct);
router.delete('/admin/deleteproduct', isLoggedIn, isAdmin, deleteProduct);


// User product routers
router.get('/products/getallproducts', isLoggedIn, getAllProduct);
router.get('/product/:productId', isLoggedIn, getProduct);


module.exports = router;