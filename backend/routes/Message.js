import express from "express"
import { getMessages, sendMessage } from "../controllers/MessageController.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post('/send/:id',isAuthenticated , sendMessage)

router.get('/:id',isAuthenticated , getMessages);

export default router