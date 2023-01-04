const mongoose = require('mongoose');
const app = require('./app');

try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(console.log('DB Connected'))
    .catch(err => console.log(err))

    app.listen(process.env.PORT, ()=>{
        console.log(`Listening on PORT ${process.env.PORT}`);
    })
} catch (err) {
    console.log(err);
}