import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`Connected successfully to MongoDB`);
    });
    
    connection.on("error", (error) => {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    });

  } catch (error) {
    console.log("something went wrong during connect database", error);
    process.exit(1);
  }
}
