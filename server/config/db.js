//  # MongoDB connection
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed : ", error.message);
        process.exit(1);
    }
};

export default db;