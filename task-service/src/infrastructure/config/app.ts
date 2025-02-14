import express from "express";
import cors from "cors";
import morgan from 'morgan'

import router from '../routes/index';

export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(morgan('tiny'))

    const corsOptions = {
      origin: [
        "http://localhost:5173",
        "https://morrow-frontend.vercel.app",
        "https://morrow-frontend-git-main-hashme7s-projects.vercel.app",
        "https://morrow-frontend-pq1y24igi-hashme7s-projects.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));

    app.use("/", router);
    return app;
  } catch (error) {
    console.log("error on spinning task service", error);
  }
};
