import {create} from "zustand";
import {axiosinstance} from '../lib/axios';
import toast from 'react-hot-toast';



export const useChatStore = create((set,get)=> ({
     
    allContects : [],
    chats : [],
    messages : [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoding : false,
    isMessagesLoding : false,
    isSoundEnable: localStorage.getItem('isSoundEnable') === true,


    tggoleSound : () =>{

        localStorage.setItem('isSoundEnable', !get().isSoundEnable)
        set({isSoundEnable : !get().isSoundEnable}) 

    },

    setActiveTab  : (tabe) => set({activeTab : tabe}),
    setSelectedUser: (selectedUser) => set({selectedUser}),


    getAllContacts: async () =>{
        set({isUserLoding:true})
        try{ 

            const res  = await axiosinstance.get('/messages/contacts')

            set({allContects : res.data})
            

        }catch(error){
            toast.error(error.responed.data.message)

        }finally{
            set({isUserLoding : false})
        }
    },
    getAllChatsPartner: async () =>{
        set({isUserLoding:true})
        try{ 

            const res  = await axiosinstance.get('/messages/chats')

            set({chats : res.data})
            

        }catch(error){
            toast.error(error.responed.data.message)

        }finally{
            set({isUserLoding : false})
        }
    },
}))