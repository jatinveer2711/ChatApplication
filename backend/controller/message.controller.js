import Message from '../model/message.model.js';
import Chat from '../model/chat.model.js' ;

export const sendMessage = async(req,res)=>{
    try {
        const {content , id} = req.body ;
        const senderId = req.user._id
        if(!content || !id ){
            return res.status(400).send("content and id are required")
        }
        let newMessage = await Message.create({
            sender : senderId ,
            content : content , 
            chat:id ,
        })
        newMessage = await newMessage.populate({
            path:"sender",
            select:"firstName lastName email"
        } )
        newMessage = await newMessage.populate({
            path:"chat",
            populate:[{
                path:"users",
                select:"firstName lastName email"
            },{
                path:"groupAdmin",
                select:"firstName lastName email"
            }]
        })
        await Chat.findByIdAndUpdate(id , {latestMessage : newMessage._id})
        return res.status(201).json(newMessage)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
} ;

// fetcl all messages 

 export const fetchMessages = async(req,res)=>{
    try {
        const {id} = req.params ;
        const messages = await Message.find({chat:id}).populate("sender" , "firstName     lastName email").populate("chat")
        return res.status(200).json({messages:messages})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// delete messages

export const deleteMessages = async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.user._id ;
        const message = await Message.findById(id);
        if(!message){
            return res.status(404).json({message:"Message not found"})
        }
       if(message.sender.toString() !== userId.toString()){
        return res.status(403).json({message:"you delete only your messages"})
       }
       await Message.findByIdAndDelete(id);
       return res.status(200).json({message:"message deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}