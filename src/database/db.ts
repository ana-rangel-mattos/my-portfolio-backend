import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL_CONNECTION!);
    console.log("Database successfully connected.");
  } catch (error) {
    console.error(error);
  }
}
