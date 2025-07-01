import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Error connecting to DB:", error); // ✅ Proper error logging
    }
};

export default dbConnect;
