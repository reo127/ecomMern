
const express = require('express');
const router = express();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { addToCart, removeFromCart } = require('../controllers/cartControllers');


// cart
router.post('/cart/:userId/:productId/:count', isLoggedIn, addToCart);
router.delete('/cart/removefromcart/:userId/:productId', isLoggedIn, removeFromCart);


module.exports = router;