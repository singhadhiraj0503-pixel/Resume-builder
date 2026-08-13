import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("MONGO-URI not defined in the environment variables");
}

export const connectToDB = async () => {
  try {
    // const MONGO_URI = process.env.MONGO_URI;

    // if (!MONGO_URI) return;

    await mongoose.connect(MONGO_URI!);
    console.log("Conneted to the database!!");
  } catch (error) {
    console.log("Error in connecting to Databse !!", error);
  }
};
