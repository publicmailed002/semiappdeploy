import express from 'express';
import { signup, login, logout } from './controller/auth.controllr.js';


const router = express.Router();
// Define your authentication routes here





router.post('/signup',signup);


router.post('/login',login)


router.post('/logout',logout)




export default router;