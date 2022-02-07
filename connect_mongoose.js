const mongoose = require('mongoose');
const express = require('express');
const url = 'mongodb://127.0.0.1:27017/test';
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${url}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
};
connectDB();

const app = express();
app.get('/',(req,res)=>{
    res.send('Hello world');
});
const port = 5000
app.listen(port,() =>{
    console.log(`Server started on port ${port}`)
});
