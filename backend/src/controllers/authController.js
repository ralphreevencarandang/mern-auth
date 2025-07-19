import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import User from '../models/user.js';
import transporter from '../config/nodeMailer.js';
export const register = async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(500).json({message: 'Please input required fields'})
    }

    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(500).json({message: 'Email already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashedPassword})

        await user.save()
        // generate token by signing the user id and the token will expire in 1d
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {  expiresIn: '1d' });

        res.cookie('token', token, {
            // Only http request can access this cookie
            httpOnly: true,
            // when the project runs in the live server it will become 'https' but in local 'http'
            // if the site is on the production the secure will be true else false
            secure: process.env.NODE_ENV === 'production',
            // when we are local environment the frontend and backend will run in localhost
            // so when in production frontend and backend may have a different host
            // when it is in the producion the same site is set to none
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            // 1 days expiry time for cookie
            maxAge: 1 * 24 * 60 * 60 * 10000
        })

        await transporter.sendMail({
            from: process.env.SMTP_SENDER,
            to: email,
            subject: "Account Registration",
            text: `Welcome ${name} to MERN Auth website. Your account has successfully registered with email id: ${email}`, // plain‑text body
        })


        res.status(200).json({message: 'Register Successfully'})
    } catch (error) {
        console.log('Error register controller'. error);
        res.status(500).json({message: 'Internal Server Error'})
    }

}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(500).json({message: 'Email and password are required'})
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message: 'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).json({message: 'Invalid credentials'})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge:  1 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({message: 'Login successfully'})
        
    } catch (error) {
        console.log('Error Login Controller', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 10000
        })
        res.status(200).json({message: 'Logout successfully'})
    } catch (error) {
        console.log('Error Logoout Controller', error)
        res.status(500).json({message: 'Internal server error'})
        
    }
}

export const sendVerifyOtp = async (req, res)=>{
    try {
        const {userId} = req.body;
        if(!userId){
            return res.status(500).json({message: 'User ID not found'})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(500).json({message: 'User not found'})
        }
        if(user.isVerified){
            return res.status(500).json({message: 'User is already verified'})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000 ));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        await transporter.sendMail({
            from: process.env.SMTP_SENDER,
            to: user.email,
            subject: "Verification Code",
            text: `Your account verification code is ${otp}`,
        })
        res.status(200).json({message: 'OTP successfully send'})
    } catch (error) {
        console.log('Error send verify otp controller', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

export const verifyEmail = async (req, res)=>{
    const {userId, otp} = req.body;
    if(!otp || !userId){
        return res.status(500).json({message: 'Please input OTP'})
    }
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(500).json({message: 'Cannot find user'})
        }
        if(otp !== user.verifyOtp || otp === ''){
            return res.status(500).json({message: 'Invalid OTP'})
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(500).json({message: 'OTP Expired'})
        }
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        res.status(200).json({message: 'Congratulations! Your account is now verified'})
    } catch (error) {
        console.log('Error Verify Email Controller', error);
        res.status(500).json({message: 'Internal server error'})
    }
}


// Check if the user is already login or not
export const isAuthenticated = async (req, res) =>{
    try {
       return  res.status(200).json({message: 'Authenticated'})
    } catch (error) {
         console.log('Error is Authenticated Controller', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

export const sendResetOtp = async (req, res)=>{

    const {email} = req.body;

    if(!email){
        return res.status(500).json({message: 'Email required'})
    }


    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message: ' Account not found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15  * 60 * 10000;

        await user.save();


        await transporter.sendMail({
            from: process.env.SMTP_SENDER,
            to: email,
            subject: "Reset OTP Verification Code",
            text: `Your account Reset verification code is ${otp}`,
        })

        res.status(200).json({message: 'Reset OTP successfully send'})



    } catch (error) {
        console.log('Error send reset otp controller', error);
        res.status(500).json({message: 'Internal server error'})
        
    }

}


export const resetPassword = async (req, res) =>{
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.status(500).json({message: 'Fields are required'})
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message: 'Account not found'})
        }
        if(user.resetOtp !== otp){
            return res.status(500).json({message: 'Reset OTP doesnt match'})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.status(500).json({message: 'OTP Expired'})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({message: 'Account reset successfully'})
    } catch (error) {
        console.log('Error reset password controller', error);
        return res.status(500).json({message: 'Internal server error'})
    }
}