import jwt from "jsonwebtoken"
import User from '../models/User.js'
import dotenv from 'dotenv';

dotenv.config()



export const socketAuthMiddlaware = async(socket,next) =>{


    try{
         // xtract token from http-only cookies
         const token = socket.handshake.headers.cookie
         ?.split("; ")
         .find((row) => row.startsWith("jwt="))
         ?.split("=")[1];
         if(!token){
            console.log("Socket connection rejected : No token provided")
            return next(new Error("Unthorized - No Token provided"))
         }

         //verify the token

         const decode = jwt.verify(token ,process.env.JWT_SECRET);
         if(!decode){
            console.log("Socket connection rejected : Invalide token")
            return next(new Error("Unthorized - Invalide token"))
         }
          //find the user from db 
         const user = await User.findById(decode.userId).select('-password');
         if(!user){
            console.log("Socket connection rejected : User not found")
            return next(new Error("Usernot found"))
         }

         //attch user info to soket
         socket.user = user;
         socket.userId = user._id.toString()

         console.log(`Socket authenticted for user : ${user.FullName} (${user._id})`)
         next();
    }catch(error){

        console.log("Error in socket authentication " ,error.message)


    }
}