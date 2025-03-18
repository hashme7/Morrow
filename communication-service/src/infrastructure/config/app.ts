import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "../routes/chatRoutes";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
export const createServer = () => {
  try {
    console.log(`
      ********************************
      
      
     on the config file............. 
      
      
      
      **********************************
      
      `);
    const app = express();
    app.use(morgan("tiny"));
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));

    app.use((req: Request, res: Response, next: NextFunction): void => {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");

      if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
      }

      next();
    });
    app.use(
      cors({
        origin: ["https://morrow-frontend.vercel.app", "http://localhost:5173"],
        credentials: true,
      })
    );

    app.use("/", chatRouter);
    return app;
  } catch (error) {
    console.log("error on spinning user service", error);
  }
};
