import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from '../src/routes/authRoute.js'
import {connectDB} from '../src/config/db.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001
await connectDB();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/auth', authRoute)



app.listen(PORT, ()=>{
    console.log(`This server is running on http://localhost:${PORT}`);
})