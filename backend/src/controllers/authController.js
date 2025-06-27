import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import User from '../models/user.js';

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

        res.status(200).json({message: 'Register Successfully'})
          
       
        
        
    } catch (error) {
        console.log('Error register controller'. error);
        res.status(500).json({message: 'Internal Server Error'})
    }

}