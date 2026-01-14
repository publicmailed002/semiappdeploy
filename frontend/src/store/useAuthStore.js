import {create} from 'zustand';
import {axiosinstance} from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3001" : "/";

export const useAuthStore = create((set,get) => ({

    authUser : null,
    ischeckingAuth:true,
    isSignUp:false,
    isLogingIn : false,
    socket:null,
    onlineUsers:[], 

    checkAuth  : async () =>{
        try{
            const res  = await axiosinstance.get('/auth/check');

            set({authUser:res.data})

            get().connectSoket();

        }catch(error){
            console.log("Auth Check Failed:",error);
            set({authUser:null});

        }finally{
            set({ischeckingAuth:false});
        }
    },

    signup : async (data) =>{
        set({isSignUp:true});

        try{

            const res = await axiosinstance.post('/auth/signup',data);
            set({authUser :res.data})
            toast.success('Account creatred succesfully!')
            
            get().connectSoket();

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isSignUp:false})
        }

    },
    login : async (data) =>{
        set({isLogingIn:true});

        try{

            const res = await axiosinstance.post('/auth/login',data);
            set({authUser :res.data})
            toast.success('Logged in succesfully!')

            get().connectSoket();

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isLogingIn:false})
        }

    },

    logout: async () =>{
        try{ 
             await axiosinstance.post('auth/logout')
             set({authUser:null});
             toast.success('Logged out successfully')

             get().disconnectSoket()

        }catch(error){
            toast.error("Error Logged out")
            console.log('Error details ' ,error)

        }
    },

    updateProfile : async (data) =>{
        try{
           const res = await axiosinstance.put('/auth/update-profile' , data);
           set({authUser: res.data});
           toast.success('Profile update successfully')
        }catch(error){

            console.log('error in update profile')
            toast.error(error.response.data.message)

        }

    },

    connectSoket : () =>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;


        const socket = io(BASE_URL , {
            withCredentials:true, // this ensures cookies are send with the connection
        })

        socket.connect();

        set({socket})


        //listen for online users event

        socket.on("getOnlineUsers" , (userIds) =>{
            set({onlineUsers:userIds})
        })

    },

    disconnectSoket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    }

}))