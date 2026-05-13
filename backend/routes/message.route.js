import express from 'express' ;
import{sendMessage,fetchMessages,deleteMessages} from '../controller/message.controller.js' ;
import {middleware} from '../middleware/middleware.js'

const router = express.Router();

router.post('/sendMessage' , middleware , sendMessage) ;
router.get('/getMessages/:id',middleware , fetchMessages);
router.delete('/delete/:id',middleware,deleteMessages);
export default router ;