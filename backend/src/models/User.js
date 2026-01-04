import mongosse from "mongoose";




const userSchema = new mongosse.Schema({

    email : {
        type:String,
        required:true,
        unique:true,
    },
    FullName : {
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
        minlength:6,
    },
    ProfilePic : {
        type:String,
        default:""
    }
},{
    timestamps:true
})



const User = mongosse.model('User',userSchema);

export default User;



