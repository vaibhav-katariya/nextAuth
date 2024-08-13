import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({
  path: 'src/.env'
})
export async function connect() {
  console.log(process.env.MONGO_URL);
  
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("MONGO_URL environment variable is not defined.");
    process.exit(1); 
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log(`Connected successfully to MongoDB`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process if a connection error occurs
  }

  mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error:", error);
    process.exit(1); // Exit if any connection error occurs after initial connection
  });
}
