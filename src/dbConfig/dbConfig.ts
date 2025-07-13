import mongoose from "mongoose";

export async function connect() {
    
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log("Connected to MongoDB");
        })

        connection.on('error', (error) => {
            console.error("MongoDB connection error:", +error); // + to string conversion from error object
            process.exit(1); // immidently stop the application error ,if 0 then application will keep running
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}