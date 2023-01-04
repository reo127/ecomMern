
const express = require('express');
const router = express();
const { signIn, signUp, logout } = require('../controllers/authControllers');

router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);
router.post('/auth/logout', logout);

module.exports = router;