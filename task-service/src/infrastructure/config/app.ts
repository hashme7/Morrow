import express from "express";
import cors from "cors";
import morgan from 'morgan'

import router from '../routes/index';

export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(morgan('tiny'))

    app.use(
      cors({
        origin: "https://morrow-frontend.vercel.app",
        credentials: true,
      })
    );
    

    app.use("/", router);
    return app;
  } catch (error) {
    console.log("error on spinning task service", error);
  }
};
