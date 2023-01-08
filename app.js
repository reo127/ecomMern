const express = require('express');
const app = express();
const cookeParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const cartRouter = require('./routers/cartRouter');


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookeParser())

app.use('/api', authRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', cartRouter);


module.exports = app