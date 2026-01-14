import {create} from "zustand";
import {axiosinstance} from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set,get)=> ({
     
    allContects : [],
    chats : [],
    messages : [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoding : false,
    isMessagesLoding : false,
    isSoundEnable: JSON.parse(localStorage.getItem('isSoundEnable')) === true,


    tggoleSound : () =>{

        localStorage.setItem('isSoundEnable', !get().isSoundEnable)
        set({isSoundEnable : !get().isSoundEnable}) 

    },

    setActiveTab  : (tabe) => set({activeTab : tabe}),
    setSelectedUser: (selectedUser) => set({selectedUser}),


    getAllContacts: async () =>{
        set({isUserLoding:true})
        try{ 

            const res  = await axiosinstance.get('/message/contacts')

            set({allContects : res.data})
            

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isUserLoding : false})
        }
    },
    getAllChatsPartner: async () =>{
        set({isUserLoding:true})
        try{ 

            const res  = await axiosinstance.get('/message/chats')

            set({chats : res.data})
            

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isUserLoding : false})
        }
    },
    getMessagesByUserId : async (userId) =>{

        set({isMessagesLoding : true})

        try{
            const res = await axiosinstance.get(`/message/${userId}`)

            set({messages : res.data})

        }catch(error){

            toast.error(error.response.data.message)

        }finally{
            set({isMessagesLoding:false})
        }
        
    },
    sendMessage: async (messageData) =>{
          
        const {selectedUser ,messages} = get();

        const {authUser} = useAuthStore.getState()

        const tempId = `temp-${Date.now()}`;


        const opmisticeMessage = {
            _id :tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt:new Date().toISOString(),
            isOptimistice :true // flage to indetify optimistice meessage
        }

        //immidetaly update the ui by adding the message 

        set({messages : [...messages , opmisticeMessage]})
         
        try{

            const res  = await axiosinstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages : messages.concat(res.data)})


        }catch(error){
            // remove optimistice messge on failure
            set({messages :messages})

            toast.error(error.response?.data?.message|| "Semothing went worng")

        }

    },
    subscribeToMessages: () =>{
        const {selectedUser ,isSoundEnable} = get();
        if(!selectedUser)  return;
        
        const socket = useAuthStore.getState().socket;

        socket.on("newMessage" ,(newMessage) =>{
              
             const isMessageSentFromSelectedUSer = newMessage.senderId ===selectedUser._id;
             if(!isMessageSentFromSelectedUSer) return;


            const currentMessages = get().messages;
            set({messages:[...currentMessages,newMessage]})

            if(isSoundEnable){
                const notficationSound = new Audio("/sounds/notification.mp3");
                notficationSound.currentTime = 0; //rest to start
                notficationSound.play().catch((error) => console.log("Audio play failed" ,error))
            }

        })
    },
    unsubscribeFromMessages: () =>{
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage")
    }
}))