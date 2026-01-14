import {Server} from 'socket.io'
import http from 'http'
import express from "express"
import dotenv from "dotenv"
import { socketAuthMiddlaware } from '../middleware/socket.auth.middlware.js'

dotenv.config()


const app = express()

const server  =  http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:[process.env.CLIENT_URL],
        credentials:true,
    }
})

// apply authentication middleware to all socket connection
io.use(socketAuthMiddlaware)


//this for store online users

const userSocketMap = {}; // {userId=soketId}


io.on("connection" ,(socket) =>{
    console.log("A user connected" ,socket.user.FullName)

    const userId = socket.userId;
    userSocketMap[userId] = socket.id; 
     
     //io.emit() is used to send events to all connected clients
    io.emit('getOnlineUsers' ,Object.keys(userSocketMap))

    //with socket.on we listen for events from clients
    socket.on('disconnect' , () =>{
        console.log("A user disconnect" ,socket.user.FullName)

        delete userSocketMap[userId]

        io.emit('getOnlineUsers' ,Object.keys(userSocketMap));
    })
})


export {io ,app ,server };