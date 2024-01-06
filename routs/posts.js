const express=require('express');
const router=express.Router();
const Posts=require('../models/posts')
const Likes=require('../models/likes');
const {validateToken}=require('../middlewares/Auth');

router.get('/', validateToken, async (req, res) => {
    const listOfPost = await Posts.findAll({
        include: ['likes']
    });

    const likedPost = await Likes.findAll({
        where: {
            UserId: req.user.id
        }
    });

    res.json({ listOfPost: listOfPost, likedPost: likedPost });
});

router.get('/byId/:id',async (req, res) => {
  const id=req.params.id;
  const post=await Posts.findByPk(id);
  res.json(post);

})

router.post('/', validateToken,async (req,res)=>{
   const post=req.body;
   post.username=req.user.username;
   post.UserId=req.user.id;
   await Posts.create(post);
   res.json(post);

})


router.delete('/:id', validateToken,async (req,res)=>{
    const postId=req.params.id;
    await Posts.destroy({
        where:{
            id:postId
        }
    });
    res.json("deleted");

})

router.get('/:id',async (req, res) => {
    const id=req.params.id;
    const posts=await Posts.findAll({
        where:{
            UserId:id
        }
    });
    res.json(posts);

})

router.put('/title',validateToken,async (req, res) => {
const {newTitle,id}=req.body;
await Posts.update(
    {title:newTitle},
    {where:{id:id}}
);
return res.json(newTitle);
});
router.put('/postText',validateToken,async (req, res) => {
    const {newText,id}=req.body;
    await Posts.update(
        {postText:newText},
        {where:{id:id}}
    );
    return res.json(newText);
        });


module.exports=router;



