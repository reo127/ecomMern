
const express = require('express');
const router = express();
const { signIn, signUp, logout, getProfile } = require('../controllers/authControllers');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../controllers/adminControllers');
const { orderProduct } = require('../controllers/orderController');

// Auth routes
router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.post('/auth/logout', logout);
router.get('/auth/profile', isLoggedIn, getProfile);

// Admin routers
router.post('/admin/addproduct', isLoggedIn, isAdmin, addProduct);
router.put('/admin/updateProduct', isLoggedIn, isAdmin, updateProduct);
router.delete('/admin/deleteproduct', isLoggedIn, isAdmin, deleteProduct);
router.get('/admin/getallproducts', isLoggedIn, isAdmin, getAllProduct);

// order router
router.post('/orders/orderproduct', isLoggedIn, orderProduct);

module.exports = router;