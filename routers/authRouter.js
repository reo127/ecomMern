
const express = require('express');
const router = express();
const { signIn, signUp, logout, getProfile } = require('../controllers/authControllers');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.post('/auth/logout', logout);
router.get('/auth/profile', isLoggedIn, getProfile);

module.exports = router;