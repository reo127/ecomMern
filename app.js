const express = require('express');
const app = express()
const cookeParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routers/authRouter')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookeParser())

app.use('/api', authRouter);


module.exports = app