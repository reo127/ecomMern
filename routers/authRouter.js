
const express = require('express');
const router = express();
const { signIn, signUp, logout, getProfile, updateProfile } = require('../controllers/authControllers');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');

// Auth routes
router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.post('/auth/logout', logout);
router.get('/auth/profile', isLoggedIn, getProfile);
router.put("/auth/updateprofile", isLoggedIn, updateProfile);


module.exports = router;