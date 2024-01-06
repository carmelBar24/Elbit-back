const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const Users=require('../models/users')

const {sign} =require('jsonwebtoken')
const {validateToken} = require("../middlewares/Auth");


router.post('/login',async (req, res) => {
    const {username,password}=req.body;
    const user=await Users.findOne({where:{
        username:username
        }});
    if(!user) return res.json({error:'User doesnt exist'});
    bcrypt.compare(password,user.password).then((match)=>{
        if(!match) return res.json({error:'Wrong username&password combination'});

        const accessToken=sign({username:user.username,id:user.id },"secret");
        res.json({token:accessToken,username:user.username,id:user.id});
    })

})

router.post('/', async (req,res)=>{
    const {username,password}=req.body;
    bcrypt.hash(password,10).then(async (hash) => {
        await Users.create({
            username: username,
            password: hash
        });
    })
    res.json('register complete');

})

router.get('/',validateToken,(req, res)=>{
    return res.json(req.user);
})

router.get('/basicInfo/:id',async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const user = await Users.findByPk(id,{attributes:{exclude:['password']}});
    return res.json(user);
})

router.put('/change-password',validateToken,async (req, res) => {
    const {oldPass, newPass} = req.body;
    const user = await Users.findOne({
        where: {
            username: req.user.username
        }
    });
    bcrypt.compare(oldPass, user.password).then((match) => {
        if (!match) return res.json({error: 'Wrong password'});

        bcrypt.hash(newPass,10).then(async (hash) => {
            await Users.update(
                {
                    password: hash
                }, {
                where:{
                    username: req.user.username
                }}
            );
            return res.json('change pass');
        })
    })});

    module.exports = router;


