import express from 'express'
import { register, login, logout, sendVerifyOtp , verifyEmail, isAuthenticated, sendResetOtp, resetPassword} from '../controllers/authController.js';
import { userAuth } from '../middlewares/userAuth.js';
const router = express.Router();
router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.post('/auth/send-otp', userAuth,sendVerifyOtp)
router.post('/auth/verify-otp', userAuth,verifyEmail)
router.get('/auth/is-auth', userAuth,isAuthenticated)
router.post('/auth/reset-otp',sendResetOtp)
router.post('/auth/reset-password',resetPassword)
export default router