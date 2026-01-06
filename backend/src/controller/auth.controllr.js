import { sendWelecoEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req,res)=>{
    const {FullName , email ,password} = req.body;

    try{

        if(!FullName || !email || !password){
            return res.status(400).json({message : "All filed are required"})
        }

        if(password.length < 6){

            return res.status(400).json({message : "Passowrd must be ate least 6 character "})
        }

        //check if email is valid

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email Format"})
        } 


        const user  = User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Email is already registered"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            FullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // generateToken(newUser._id,res);
            // await newUser.save();
            const savedUSer = await newUser.save();
            generateToken(savedUSer._id,res);
            res.status(201).json({
                _id: newUser._id,
                FullName : newUser.FullName,
                email : newUser.email,
                ProfilePic : newUser.ProfilePic
            })

            try{ 

                await sendWelecoEmail(savedUSer.email,savedUSer.FullName,process.env.CLIENT_URL);
                

            }catch(error){
                console.log("Error sending welcome email:", error)
            }
        }else{
            res.status(500).json({message : "Invalid user data"})
        }
    }catch(error){

        console.log("Error in signup controller:",error)

        res.status(500).json({message : "internal Server Error"})

    }
}

export const login = async (req,res)=>{
      
     const {email , password} = req.body;

     try{

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message : "Invalide Credentials"})

        const isPasswordCorrect = await bcrypt.compare(password ,user.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalide Credentials"})
        generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            FullName : user.FullName,
            email : user.email,
            ProfilePic : user.ProfilePic
        })


     }catch(error){

        console.error("Error in login controller:",error)

        res.status(500).json({message:"Internal Server Error"})

     }
}


export const logout =  (_,res)=>{
   res.cookie('jwt','',{maxAge:0});
   res.status(200).json({message : "Logged out successfully"});
}