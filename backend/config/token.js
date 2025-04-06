import jwt from 'jsonwebtoken';
const genToken = (userId) => {
    try{
        let token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        return token;
    }
    catch(error){
        console.log("Token generation error", error.message)
    }
}

export default genToken;