import Chat from '../model/chat.model.js';

export const accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        const LoggedUserID = req.user._id;
        if (!userId) {
            return res.status(400).send("UserId required");
        }
        if (LoggedUserID.toString() === userId.toString()) {
            return res.status(400).send("cannot send create chats with yourself")

        }


        let Ischat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [LoggedUserID, userId] }
        }).populate("users", "-password").populate("latestMessage");
         if (Ischat) {

      // ✅ RESET delete when reopened
      if (Ischat.deletedBy.length > 0) {
        Ischat.deletedBy = [];
        await Ischat.save();
      }

      return res.status(200).json(Ischat);
    }

   
        const newChat = await Chat.create({
            chatName: "",
            isGroupChat: false,
            users: [LoggedUserID, userId]
        })
        const fullchat = await Chat.findById(newChat._id).populate("users", "-password")
        return res.status(200).json(fullchat)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }

};

//  fetch all chats 

export const fetchChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ users: { $in: [userId] } ,
        deletedBy:{$ne:userId}},{
            
        }).populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
        return res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

//group chat creation

export const createGroupchat = async (req, res) => {
    try {
        let  { chatName, users } = req.body;
        if (!chatName || !users || users.length < 2) {
            return res.status(400).send("please create a group chat with more then 2 users")
        }

        users = [...new Set(users)]
        if (!users.includes(req.user._id.toString())) {
            users.push(req.user._id.toString());

        }
        users = [...new Set(users)];
        const groupChat = await Chat.create({
            chatName,
            users,
            isGroupChat: true,
            groupAdmin: req.user._id
        });
        const fullGroupChat = await Chat.findById(groupChat._id).populate("users", "-password").populate("groupAdmin", "-password");
        return res.status(201).json(fullGroupChat)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
} ;

// deletes chats

export const deleteChat = async(req,res)=>{
    try {
        const {chatId} = req.params ;
        const userId = req.user._id;
        const chat = await Chat.findById(chatId)
        if(!chat){
            return res.status(404).json({message:"Chat not found"})
        }
        if(chat.isGroupChat){
            return res.status(400).json({message:"Cannot delete a group chat"})
        }
        if(!chat.users.includes(userId)){
            return res.status(403).json({message:"You are not a member of this chat"})
        }
       if(chat.deletedBy.includes(userId)){
        return res.status(400).json({message:"chat already deleted"})
       }
       chat.deletedBy.push(userId)
       await chat.save()
       return res.status(200).json({message:"Chat removed from your list"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


// search chats

 export const searchChats = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const chats = await Chat.find({
      chatName: { $regex: keyword, $options: "i" },
      users: { $in: [req.user._id] },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "firstName lastName email",
        },
      });

    return res.status(200).json(chats);

  } catch (error) {
    console.error("Search Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


