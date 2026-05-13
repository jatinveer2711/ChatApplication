import express from 'express'
import { signup, login, logout , searchUsers } from '../controller/user.controller.js';
import{middleware} from '../middleware/middleware.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/search',middleware,searchUsers)
export default router