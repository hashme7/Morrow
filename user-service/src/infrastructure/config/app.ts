import express from "express";
import cors from "cors";
import userRouter from "../routes/userRoutes";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const createServer = () => {
  try {
    const app = express();
    app.use(morgan("tiny"));
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    app.use(
      cors({
        origin: "https://morrow.hashim-dev007.online",
        credentials: true,
      })
    );
    
    app.use("/", userRouter);
    return app;
  } catch (error) {
    console.log("error on spinning user service", error);
  }
};
