import {create} from 'zustand';
import {axiosinstance} from '../lib/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set,get) => ({

    authUser : null,
    ischeckingAuth:true,
    isSignUp:false,

    checkAuth  : async () =>{
        try{
            const res  = await axiosinstance.get('/auth/check');

            set({authUser:res.data})

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

        }catch(error){
            toast.error(error.response.data.message)

        }finally{
            set({isSignUp:false})
        }

    }

}))