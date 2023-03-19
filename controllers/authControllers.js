const CustomError = require('../utils/customError')
const User = require('../schema/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
    //could be in a separate file in utils
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name, email, password)) {
           return res.status(400).send('All filds area reqired')
        }

        // Check user exist
        const existUser = await User.findOne({ email })
        if (existUser) {
           return res.status(400).send('User Aleary exist, try with another email')
        }

        // Create user and send 
        const user = await User.create({ name, email, password });
        user.password = undefined

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @LOGIN
 * @route http://localhost:8000/api/auth/login
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/

const signIn = async(req, res)=> {
    try {
        const {email, password} = req.body;
        if (!( email, password)) {
           return res.status(400).send('All filds area reqired')
        }
        
        // check user exist 
        const user = await User.findOne({email});
        if(!user){
           return res.status(400).send('Email not found, place SignUp ')
        }

        
        // check password
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            res.status(400).send('Password did not match')
        }
        
        // res.status(200).json({user, success : "login ok"})
        // create token and save in cookies
        const token = jwt.sign(
            {_id : user._id, role: user.role},
            process.env.JWT_SERECT,
            {expiresIn: process.env.JWT_EXPIRY}
        );

        res.cookie('token', token, cookieOptions);
        user.password = undefined;
        return res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @LOGOUT
 * @route http://localhost:8000/api/auth/logout
 * @description User logout bby clearing user cookies
 * @parameters  
 * @returns success message
 ******************************************************/
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: "Logged Out"
        });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:8000/api/auth/profile
 * @description check for token and populate req.user
 * @parameters 
 * @returns User Object
 ******************************************************/
const getProfile = async ( req, res ) => {
    try {
        const {user} = req;
        if(!user){
            return res.status(400).json({"message": "User not found"});
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @UPDATE_PROFILE
 * @REQUEST_TYPE PUT
 * @route http://localhost:8000/api/auth/updateprofile
 * @description take phone, address, city, state, zip and update in database
 * @parameters phone, address, city, state, zip
 * @returns Updated User Object
 ******************************************************/
const updateProfile = async( req, res ) => {
    try {
        const {phone, address, city, state, zip} = req.body;
        const updateUser = await User.updateMany(
            {_id: req.user._id},
            {$set: {
                "address" : address,
                "phone": phone,
                "city": city,
                "state": state,
                "zip": zip
            }}
        )

        if(!(updateUser.modifiedCount > 0 )){
            res.status(400).json({
                success: false,
                updateUser
            });
            return;
        }

        res.status(200).json({
            success: true,
            updateUser
        });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports = {signIn, signUp, logout, getProfile, updateProfile}