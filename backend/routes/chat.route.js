import express from 'express';
import{accessChat,fetchChats,createGroupchat, searchChats , deleteChat} from '../controller/chat.controller.js';
import { middleware } from '../middleware/middleware.js';

const router = express.Router();

router.post('/accesschat',middleware , accessChat)
router.get('/fetchats',middleware , fetchChats)
router.post('/creategroupchat',middleware , createGroupchat)
router.get('/search',middleware,searchChats)
router.delete('/delete/:chatId',middleware,deleteChat)

export default router ;