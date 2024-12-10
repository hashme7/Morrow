import mongoose from "mongoose";
import { seedStatus } from "./seed";

export const DBConfig = async () => {
  try {
    const DB_URL = process.env.MONGO_URL as string;
    await mongoose.connect(DB_URL);
    await seedStatus();
    console.log("task-service : database is succesfully connected");
  } catch (error) {
    console.log("error on connecting database on task-service", error);
  }
};
   