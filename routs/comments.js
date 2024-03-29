const express=require('express');
const router=express.Router();
const Comments=require('../models/comments')
const {validateToken} = require("../middlewares/Auth");

router.get('/:postId',async (req, res) => {
    const postId=req.params.postId;
    const comments=await Comments.findAll({where:{
        PostId:postId
        }});
    res.json(comments);

})

router.post('/',validateToken, async (req,res)=>{
    const comment=req.body;
    comment.username=req.user.username;
    await Comments.create(comment);
    res.json(comment);
})

router.delete('/:commentId',validateToken, async (req,res)=>{
    const commentId=req.params.commentId;
    await Comments.destroy({where:{
        id:commentId
        }});

    return res.json('deleted');
})

module.exports=router;