import mongoose from "mongoose";

type connectionObject = {
    isConnected: number;
}

const connection: connectionObject = {
    isConnected: 0,
}

export async function connectDB() {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        if(db){
            connection.isConnected = db.connections[0].readyState;
        }
        console.log("Connected to database successfully");

    } catch (error) {
        console.log("Error connecting to database: ", error);
        process.exit(1);
    }
}