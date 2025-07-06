import express from 'express'

import { getCurrentChatters, getUserBySearch } from '../controllers/UserhandlerControler.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router()

router.get('/search',isAuthenticated,getUserBySearch);

router.get('/currentchatters',isAuthenticated,getCurrentChatters)

export default router