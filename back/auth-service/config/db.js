import mongoose from 'mongoose'
import dotenv from 'dotenv'

//Load Environment variable
dotenv.config();

//DB Connection
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connection successful')
    } catch (error) {
        console.log("Error while connection to MongoDB: ", error)
        process.exit(1)
    }

};

export default connectDB;