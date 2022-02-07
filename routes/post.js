const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

//@route Get api/posts
//@desc Get post
//@access private 
router.get('/',verifyToken, async(req,res)=>{
    try{
        // populate đi vào user ,[''] và chỉ lấy cột username
        const post = await Post.find({user: req.userId}).populate('user',
        ['username'])
        res.json({success: true,post})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false, message:`Internal server error`})
    }
})


//@route POST api/posts
//@desc Create post
//@access private 

router.post("/",verifyToken, async(req,res)=>{
    const{title,description,url,status} =req.body
    // simple validation
    if(!title)
    return res.status(400).json({success: false, message:'Title is required'})
    try{
        const newPost = new Post({
            title,
            description,
            url:(url.startsWith('https://'))? url:`https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
        await newPost.save()
        res.json({success: true, message:'Happy learning!', post: newPost})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Internal server error'})
    }
}) 
//@route PUT api/posts
//@desc Update post
//@access private 

router.put('/:id',verifyToken,async(req,res)=>{
    const{title,description,url,status} = req.body
    if(!title)
    return res.status(400).json({success: false,message: 'title is require'})
    try{
        let updatePost ={
            title,
            description: description || '' ,
            url: (url.startsWith('https://') ? url: `https://${url}`) || '',
            status: status || 'TO LEARN',
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatePost = await Post.findOneAndUpdate(postUpdateCondition,updatePost,{new: true})
        //User not authorised to update post
        if(!updatePost)
        return res.status(401).json({success: false,message: 'Post not found or user not authorised'})
        res.json({success: true,message:'Excellent process!',post: updatePost})
    }catch(error){
        console.log(error)
        res.status(500).json({success: false,message:'Internal server error'})
    }
})
//@route delete api/posts
//@desc delete post
//@access private 

router.delete('/:id',verifyToken, async(req,res) =>{
    try{
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletePost = await Post.findByIdAndDelete(postDeleteCondition)
        //user not authorised or post not found 
        if(!deletePost)
        return res.status(401).json({success: false, message:'post now found or user not authorised'})
        res.json({success: true, message:'delete successfull',post: deletePost})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false,message:'Internal server error'})
    }
}
)
module.exports = router