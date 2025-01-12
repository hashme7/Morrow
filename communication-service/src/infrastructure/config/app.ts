import express from "express";
import cors from "cors";
import morgan from 'morgan'
import chatRouter from '../routes/chatRoutes';

export const createServer = () => {
  try {
    const app = express();
    app.use(morgan('tiny'))
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    const corsOptions = {
      origin: ["http://localhost:5173", "https://morrow-frontend.vercel.app"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
      ],
    };

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use("/", chatRouter);
    return app;
  } catch (error) {
    console.log("error on spinning user service", error);
  }
};
