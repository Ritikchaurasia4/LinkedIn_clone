import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next)=>{
    try{
        let {token} = req.cookies;
        if(!token){
            return res.status(400).json({message:"token not found. user does't have token"})
        }
        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(400).json({message:"user does't have valid token"})
        }
        req.userId = verifyToken.Id;
        next();
    }
    catch(error){
        return res.status(500).json({message:"Is auth errorm"})
    }
}