import express from 'express'
import dotenv from 'dotenv';
import { clerkMiddleware } from "@clerk/express";
import userRouter from './routes/user.route.js'
dotenv.config({ path: './.env' });

const app  = express()

app.use(express.json())
app.use(clerkMiddleware())

app.use('api/user' ,userRouter)

app.listen(8000 ,()=>{
console.log(`app running on the port 8000`)
})