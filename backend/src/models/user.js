import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String , required:true, min: [3, 'Name should be at least 3 characters']},
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true ,min: [8, 'Password should be at least 8 characters']},
    verifyOtp: {type:String, default:''},
    verifyOtpExpireAt: {type:Number, default:0},
    isVerified: {type:Boolean, default:false},
    resetOtp: {type:String, default:''},
    resetOtpExpireAt: {type:Number, default:0},
}, {timestamps:true})



 const User = mongoose.models.user || mongoose.model('user', userSchema)

 export default User