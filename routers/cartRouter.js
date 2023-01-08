
const express = require('express');
const router = express();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { addToCart, deleteCart } = require('../controllers/productController');


// cart
router.post('/cart/:userId/:productId', isLoggedIn, addToCart);
router.post('/cart/removefromcart/:userId/:productId', isLoggedIn, deleteCart);


module.exports = router;