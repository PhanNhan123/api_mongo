const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ikcie.mongodb.net/travel?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log(`MongoDB Connected `);
    } catch (err) { 
        console.error(err);
        process.exit(1)
    }
};
connectDB();

const app = express();
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)


app.get('/',(req,res)=>{
    res.send('Hello world');
});
const port = 5000
app.listen(port,() =>{
    console.log(`Server started on port ${port}`)
});
