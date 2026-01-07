import express from 'express';
import { signup, login, logout, updateProfile } from './controller/auth.controllr.js';
import { protectRoute } from './middleware/auth.middlwear.js';


const router = express.Router();
// Define your authentication routes here





router.post('/signup',signup);


router.post('/login',login)


router.post('/logout',logout);

router.put('/update-profile',protectRoute,updateProfile)

router.get("/check",protectRoute,(req,res) => res.status(200).json(req.user))




export default router;