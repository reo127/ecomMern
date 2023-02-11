const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');

const isLoggedIn = async (req, res, next) => {
    try {
        let token;
        if ( req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            token = req.cookies.token || req.headers.authorization.split(" ")[1]
        }

        if(!token){
            return res.status(400).json("Not authorized to access this route");
        }

        const jwtpayload = await jwt.verify(token, process.env.JWT_SERECT);
        req.user = await User.findById({_id : jwtpayload._id});
        next();

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports = {isLoggedIn}