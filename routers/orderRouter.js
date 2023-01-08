const express = require('express');
const router = express();
const { orderProduct, updateOrder, deleteOrder, allOrders } = require('../controllers/orderController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');


// order router
router.post('/orders/orderproduct', isLoggedIn, orderProduct);
router.put('/orders/updateorder/:status/:orderId', isLoggedIn, updateOrder);
router.delete('/orders/deleteorder/:orderId', isLoggedIn, deleteOrder);
router.get('/orders/allorders', isLoggedIn, isAdmin, allOrders);

module.exports = router;