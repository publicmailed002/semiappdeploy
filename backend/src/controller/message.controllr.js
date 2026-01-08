import Message from "../models/Message.js";
import User from "../models/User.js";


export const getAllContectes  = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filterUsers);

    }catch(error){
        console.error("Error in getAllContectes:", error);
        res.status(500).json({ message: "Server error" });

    }
}


export const getMessagesByuserId = async (req, res) =>{

    try{
        const myId = req.user._id;
        const {id : userToChatId} = req.params;
        const messages = await Message.find({
            $or :[
                { senderId : myId , receiverId : userToChatId },
                { senderId : userToChatId , receiverId : myId },
            ]
        });

        res.status(200).json(messages);

    }catch(error){
        console.log("Error in getMessage controller:", error.message);
        res.status(500).json({ message: "internal server error" });

    }
}


export const sendMessage = async (req, res) => {

    try{

        const {text , image}  = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){

            const uplodeResponse = await cloudinary.uploader.upload(image)
            imageUrl = uplodeResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        
        const savedMessages = await newMessage.save();
        //todo  : send message in rel-time if user is online
        res.status(201).json(savedMessages);

    }catch(error){

        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ message: "internal server error" });

    }
}

export const getAllchatsPrtner = async (req, res) => {

    try{

        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId : loggedInUserId},
                {receiverId : loggedInUserId},
            ]
        })

        const chatPartnersIds = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))]

        const chatPartners = await User.find({
            _id: { $in: chatPartnersIds }
        }).select('-password');

        res.status(200).json(chatPartners);

    }catch(error){
        console.log("Error in getAllchatsPrtner:", error.message);
        res.status(500).json({ message: "internal server error" });
    }
}