import express from "express"

import dbConnect from "./utils/dbConnect.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"


import userRoutes from "./routes/User.js"
import messageRoutes from "./routes/Message.js"
dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/message", messageRoutes);



dotenv.config();


app.use(express.json());
app.use(cookieParser())


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT}`);
})