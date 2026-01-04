import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

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
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                FullName : newUser.FullName,
                email : newUser.email,
                ProfilePic : newUser.ProfilePic
            })
        }else{
            res.status(500).json({message : "Invalid user data"})
        }
    }catch(error){

        console.log("Error in signup controller:",error)

        res.status(500).json({message : "internal Server Error"})

    }
}