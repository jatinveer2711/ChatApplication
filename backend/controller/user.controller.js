import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const secretkey = process.env.SECRET_KEY
const generateToken = (id) => {
    return jwt.sign({ id }, secretkey, {
        expiresIn: "7d"
    })
}



export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "please enter your email and password" })
        }
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        return res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not exists" })
        }
        const checkpassword = await bcrypt.compare(password, user.password)
        if (!checkpassword) return res.status(400).json({ message: "password was incorrect" })
        return res.status(200).json({
            message: "login successfully", token: generateToken(user.id),
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,

            }
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "logout" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// search users

export const searchUsers = async(req,res)=>{
    try {
        const {keyword} = req.query;
        if(!keyword || keyword.trim()===""){
            return res.status(400).json({message:"keyword is required"})
        }
        const users = await User.find({
            _id:{$ne:req.user._id},
            $or:[
                {firstName:{$regex:keyword,$options:"i"}},
                {lastName:{$regex:keyword,$options:"i"}},
                {email:{$regex:keyword,$options:"i"}}
            ]
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}