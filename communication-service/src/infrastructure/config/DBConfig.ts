import mongoose from "mongoose";

export const DBConfig = async () => {
  try {
    const DB_URL = process.env.MONGO_URL as string;
    await mongoose.connect(DB_URL);
    console.log("user-service : database is succesfully connected");
  } catch (error) {
    console.log("error on connecting database on user-service", error);
  }
};
