import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
dotenv.config();

export const middleware = async (req,res,next)=>{
    const secretKey = process.env.SECRET_KEY
    
        const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized access"})
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Token not found"})
    }
    try {
    const decoded = jwt.verify(token,secretKey)
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
        return res.status(401).json({message:"user not found"})
    }
    req.user = user;
    next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Unauthorized access"})
    }
}