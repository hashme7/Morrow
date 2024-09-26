import express from "express";
import cors from "cors";
import userRouter from "../routes/userRoutes";

export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());

    const corsOptions = {
      origin: "http://localhost:5173", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"], 
    };

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));

    app.use("/", userRouter);
    return app;
  } catch (error) {
    console.log("error on spinning user service", error);
  }
};
