import express, { Request, Response } from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "morrow-common/dist";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://morrow-frontend.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.use("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "gateway is running successfully on 8000" });
});
console.log("process",process.env.PROJECT_SERVICE)
app.use(
  "/project",
  authenticate,
  proxy(process.env.PROJECT_SERVICE || "http://localhost:4000")
);
app.use("/user", authenticate, proxy(process.env.USER_SERVICE||"http://localhost:3000"));
app.use("/communicate", authenticate, proxy(process.env.COMMUNICATION_SERVICE || "http://localhost:2000"));
app.use("/task", authenticate, proxy(process.env.TASK_SERVICE || "http://localhost:5000"));
app.use("/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:9090"));

app.listen(process.env.PORT || 8000, () => {
  console.log(`gateway service is running on port :http://localhost:8000`);
});
