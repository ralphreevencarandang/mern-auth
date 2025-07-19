import express from 'express'
import {getUserData} from '../controllers/userController.js'
import { userAuth } from '../middlewares/userAuth.js';
const router = express.Router();

router.post('/users', userAuth ,getUserData)

export default router