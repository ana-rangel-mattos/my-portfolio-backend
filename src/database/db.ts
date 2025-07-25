import mongoose from "mongoose";

const { MONGO_USER, MONGO_USER_PASSWORD, MONGO_CLUSTER } = process.env;

export async function connectToDatabase(databaseName: string) {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@${MONGO_CLUSTER}/${databaseName}?retryWrites=true&w=majority`
    );
    console.log(`Successfully connected with ${databaseName} database.`);
  } catch (error) {
    console.error(error);
  }
}
