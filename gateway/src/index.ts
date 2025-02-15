import express, { NextFunction, Request, Response } from "express";
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

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.method === "OPTIONS") {
    console.log(`-------------------------
      
                    options method called
              ${req.method} and ${req.url}

      -----------------------------
      `);
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
    return;
  }
  next();
});

app.use("/health", (req: Request, res: Response) => {
  console.log("health checking... 123");
  res.status(200).json({ message: "gateway is running successfully on 8000" });
});
console.log("process", process.env.PROJECT_SERVICE);
app.use(
  "/project",
  authenticate,
  proxy(process.env.PROJECT_SERVICE || "http://localhost:4000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "", // Forward cookies
      };
      return proxyReqOpts;
    },
  })
);
app.use(
  "/user",
  (req, res, next) => {
    console.log(`
    ++++++++++++++++++++++++++++++
    
    ${req.url} 
    
    ++++++++++++++++++++++++++++++
    `);
    console.log("/user proxying ");
    next();
  },
  authenticate,
  proxy(process.env.USER_SERVICE || "http://localhost:3000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "", 
      };
      return proxyReqOpts;
    },
  })
);
app.use(
  "/communicate",
  authenticate,
  proxy(process.env.COMMUNICATION_SERVICE || "http://localhost:2000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "", 
      };
      return proxyReqOpts;
    },
  })
);
app.use(
  "/task",
  authenticate,
  proxy(process.env.TASK_SERVICE || "http://localhost:5000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "", 
      };
      return proxyReqOpts;
    },
  })
);
app.use(
  "/auth",
  proxy(process.env.AUTH_SERVICE || "http://localhost:9090", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        cookie: srcReq.headers.cookie || "", // Forward cookies
      };
      return proxyReqOpts;
    },
  })
);

app.listen(process.env.PORT || 8000, () => {
  console.log(`gateway service is running on port :http://localhost:8000`);
});
