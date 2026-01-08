import express from 'express';
import { getAllchatsPrtner, getAllContectes, getMessagesByuserId, sendMessage } from './controller/message.controllr.js';
import { protectRoute } from './middleware/auth.middlwear.js';
import { arjProtection } from './middleware/arcjet.middlware.js';

const router = express.Router();



router.use(arjProtection,protectRoute)

router.get('/contacts' , getAllContectes)
router.get('/chats' ,  getAllchatsPrtner)
router.get('/:id' , getMessagesByuserId)
router.post('/send/:id', sendMessage);

export default router;