const express = require('express');
const router = express.Router();
const argon2 = require('argon2'); 
const jwt = require('jsonwebtoken');

const User = require('../models/User')

//@route POST api/auth/register
//@desc Register
//@access public 
router.post('/register', async(req,res)=>{
    const{username,password} = req.body
    if(!username || !password)
    return res
        .status(400)
        .json({success: false, message:'Missing user and/or password' })
        try{
            //check for existing user
            const user = await User.findOne({username : username})
            if(user)
            return res.status(400).json({success: false, message:'Username already taken'})
            // All good
            const hashedPassword = await argon2.hash(password)
            const newUser  = new User({username,password: hashedPassword})
            await newUser.save()

            // return token
            const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)
            return res.json({success: true, message:"user create successful",accessToken })
        }catch(error){
            console.log(err)
            res.status(500).json({success: false,message: "Internal server error"})

        }
})

//@route POST api/auth/login 
//@ desc login user
//@access public 


router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password)
    return res.status(400).json({success: false,message: `Missing username and/or password`})
    try{
        // check for existing user
        const user = await User.findOne({username})
        if(!user)
        return res.status(400).json({success: false, message: 'Incorrect username or password'})
        //user found 
        const passwordValid = await argon2.verify(user.password,password)
        if(!passwordValid)
        return res.status(400).json({success: false,message:'Incorrect username or password'})
        // all good
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message:"User logged in successful",accessToken })
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Internal server error"})
    }
})


router.get('/',(req,res)=> res.send('USER ROUTE'))

module.exports = router