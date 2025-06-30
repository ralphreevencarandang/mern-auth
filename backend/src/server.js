import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from '../src/routes/authRoute.js'
import useRoute from '../src/routes/userRoute.js'
import {connectDB} from '../src/config/db.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001
await connectDB();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

app.use('/api', authRoute)
app.use('/api', useRoute)



app.listen(PORT, ()=>{
    console.log(`This server is running on http://localhost:${PORT}`);
})