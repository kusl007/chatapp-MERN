import express from "express"

import dbConnect from "./utils/dbConnect.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


const app=express();


dotenv.config();


app.use(express.json());
app.use(cookieParser())


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT}`);
})