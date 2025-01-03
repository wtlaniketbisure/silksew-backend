import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/connectDB.js';
import { router } from './routes/productRouter.js';
import { userRouter } from './routes/userRouter.js';
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
// const port = 4000;

app.get('/',(req, res)=>{
    res.json("hello");
})

connectDB()
app.use('/api',router)
app.use('/api/user',userRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})

