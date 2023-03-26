
const express = require('express');
const router = express();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { addToCart, removeFromCart } = require('../controllers/cartControllers');


// cart
router.post('/cart/:productId/', isLoggedIn, addToCart);
router.delete('/cart/removefromcart/:productId', isLoggedIn, removeFromCart);


module.exports = router;