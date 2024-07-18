import mongoose from "mongoose";
const connectDB =async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName : "passportjsauth"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Connected successfully....")  //only for the development phase remove it in production phase.
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;