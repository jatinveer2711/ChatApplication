import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
    firstName:{
        type:String , 
        require:["please enter your firsname"]
    } ,
    lastName:{
        type:String , 
        require : ["please enter your lastName"]
    } ,
    email:{
        type:String,
        require : true ,
        unique:true ,
        lowercase:true,
        trim:true
        
    } , 
    password:{
        type:String , 
        require : true
    }
},{timestamps:true})
const User = new mongoose.model("User",userSchema)
export default User