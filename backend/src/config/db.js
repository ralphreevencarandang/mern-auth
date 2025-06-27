import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DATA BASE CONNECTED');
    } catch (error) {
        console.log('Error connecting database', error);
        process.exit(1)
        
    }
}