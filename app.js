const express = require('express');
const app = express();
const cookeParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const cartRouter = require('./routers/cartRouter');
const multer = require('multer/')
const upload = multer({ dest: 'uploads/' })


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    origin:["http://localhost:3000", "*/"],
    'Access-Control-Allow-Credentials': true,
    "withCredentials": true 
}))
app.use(cookeParser())
app.use('/uploads', express.static('uploads'));


app.use('/api', authRouter);
app.use('/api', upload.array('photos'), productRouter);
app.use('/api', orderRouter);
app.use('/api', cartRouter);


module.exports = app