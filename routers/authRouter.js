
const express = require('express');
const router = express();
const { signIn, signUp, logout, getProfile } = require('../controllers/authControllers');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const { addProduct } = require('../controllers/adminControllers');

// Auth routes
router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.post('/auth/logout', logout);
router.get('/auth/profile', isLoggedIn, getProfile);

// Admin routers
router.post('/admin/addproduct', isLoggedIn, isAdmin, addProduct);

module.exports = router;