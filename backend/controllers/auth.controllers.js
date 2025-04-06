import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) =>{
    try{
        const {firstName, lastName, userName, email, password} = req.body;

        if(!firstName || !lastName || !userName || !email || !password){
            return res.status(400).json({message: "All fields are required !"})
        };
        
        let existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message: "Email already exists !"});
        }
        let existUser = await User.findOne({userName});
        if(existUser){
            return res.status(400).json({message: "Username already exists !"});
        }

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters long !"});
        }

        const hassedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hassedPassword,
        });

        let token;
        {
            try{
                token = await genToken(user._id);
            }
            catch(error){
                console.log("User Token generation error", error.message);
            }
        }
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
            sameSite: "strict"
        })

        return res.status(202).json(user);
    }
    catch(error){
        console.log("User registration error", error);
        return res.status(500).json({message: "Signup error"});
    }
}

export const Login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required !"})
        };

        let user =  await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User does not exist !"});
        }
        
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password!"});
        }

        let token;
        {
            try{
                token = await genToken(user._id);
            }
            catch(error){
                console.log("User Token generation error", error.message);
            }
        }
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
            sameSite: "strict"
        })

        return res.status(202).json(user);

        // return res.status(202).json({message:"User Signup successfully  "});
    }
    catch(error){
        console.log("User Sign in  error", error);
        return res.status(500).json({message: "Login error"});
    }
}

export const Logout = async (req, res) =>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"User Logout successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"logout error"});
    }
}