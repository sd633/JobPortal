import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection successful at ${mongoose.connection.host}`);
    } catch(error){
        console.log(`Error connecting to database ${error}`);
    }
}

export default connectDB;