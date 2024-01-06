
const {verify} = require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    const accessToken=req.header("accessToken");

    if(!accessToken) return res.json({error:'user not logged in'});
    try{
        const validToken=verify(accessToken,"secret");
        req.user=validToken;
        if(validToken)
        {
            console.log('valid')
            return next();
        }
    }
    catch(e){
        return res.json({error:e});
    }
}

module.exports={validateToken};