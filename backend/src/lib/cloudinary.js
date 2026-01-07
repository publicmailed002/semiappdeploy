import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDEINARY_CLOUDNAME,
    api_key: process.env.CLOUDEINARY_API_KEY,
    api_secret: process.env.CLOUDEINARY_API_KEY_SECRTE,
})


export default cloudinary;