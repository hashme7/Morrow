import express, {  Request, Response } from "express";
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
  origin: [
    "http://localhost:5173",
    "https://morrow-frontend.vercel.app",
    "https://morrow-frontend-git-main-hashme7s-projects.vercel.app",
    "https://morrow-frontend-pq1y24igi-hashme7s-projects.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.options("*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-requested-with"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});



app.use("/health", (req: Request, res: Response) => {
  console.log("health checking... 1");
  res.status(200).json({ message: "gateway is running successfully on 8000" });
});

const createProxy = (serviceUrl: string) =>
  proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq: Request) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        Origin: srcReq.headers.origin || process.env.FRONTEND_URL,
      };
      return proxyReqOpts;
    },

    userResHeaderDecorator: (headers, userReq: Request, userRes: Response) => {
      headers["Access-Control-Allow-Origin"] = userReq.headers.origin || "*";
      headers["Access-Control-Allow-Credentials"] = "true";
      return headers;
    },
  });

app.use(
  "/project",
  authenticate,
  createProxy(process.env.PROJECT_SERVICE || "http://localhost:4000")
);
app.use(
  "/user",
  authenticate,
  createProxy(process.env.USER_SERVICE || "http://localhost:3000")
);
app.use(
  "/communicate",
  authenticate,
  createProxy(process.env.COMMUNICATION_SERVICE || "http://localhost:2000")
);
app.use(
  "/task",
  authenticate,
  createProxy(process.env.TASK_SERVICE || "http://localhost:5000")
);
app.use(
  "/auth",
  createProxy(process.env.AUTH_SERVICE || "http://localhost:9090")
);

app.listen(process.env.PORT || 8000, () => {
  console.log(`gateway service is running on port :http://localhost:8000`);
});
