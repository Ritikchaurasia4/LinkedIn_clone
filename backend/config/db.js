import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully")
    }
    catch(error){
        console.log("database connection error", error.message)
    }
}
export default connectDB;