import express, { NextFunction, Request, Response } from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authenticate } from "morrow-common/dist";
import dotenv from "dotenv";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin: ["https://morrow-frontend.vercel.app", "http://localhost:5173"],
  credentials: true,
};
// app.use((req, res, next) => {
//   console.log("🔎 CORS Debug:", req.headers.origin);
//   console.log("🛠 Allowed Origins:", corsOptions.origin);
//   next();
// });
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
console.log(
  process.env.PROJECT_SERVICE,
  process.env.USER_SERVICE,
  process.env.COMMUNICATION_SERVICE,
  process.env.TASK_SERVICE,
  process.env.AUTH_SERVICE,
);

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.method === "OPTIONS") {
    console.log("req.headers.orgin from options method", req.headers.origin);
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
app.use(
  "/project",
  authenticate,
  proxy(process.env.PROJECT_SERVICE || "http://localhost:4000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      console.log("cookie of project:", srcReq.headers.cookie);
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        ...srcReq.header,
        cookie: srcReq.headers.cookie || "",
      };
      return proxyReqOpts;
    },
  })
);
app.use(
  "/user",
  authenticate,
  proxy(process.env.USER_SERVICE || "http://localhost:3000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      console.log("cookies of user:", srcReq.headers.cookie);
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        ...srcReq.header,
        cookie: srcReq.headers.cookie || "",
      };
      return proxyReqOpts;
    },
  })
);

// app.use(
//   "/communicate",
//   authenticate,
//   proxy(process.env.COMMUNICATION_SERVICE || "http://localhost:2000", {
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       console.log("cookies of user:", srcReq.headers.cookie);
//       proxyReqOpts.headers = {
//         ...proxyReqOpts.headers,
//         ...srcReq.headers,
//         cookie: srcReq.headers.cookie || "",
//       };
//       return proxyReqOpts;
//     },
//   })
// );

app.use(
  "/communicate",
  authenticate,
  createProxyMiddleware({
    target: process.env.COMMUNICATION_SERVICE || "communication-service:2000",
    changeOrigin: true,
    ws: true,
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log("on the proxy req......");
        console.log("Proxying request to:", process.env.COMMUNICATION_SERVICE);
        if (req.headers.cookie) {
          proxyReq.setHeader("cookie", req.headers.cookie);
        }
        proxyReq.setHeader("origin", req.headers.origin || "");
        proxyReq.setHeader("host", req.headers.host || "");
      },
      proxyReqWs: (proxyReq, req, socket, options, head) => {
        if (req.headers.cookie) {
          proxyReq.setHeader("cookie", req.headers.cookie);
        }
        proxyReq.setHeader("origin", req.headers.origin || "");
        proxyReq.setHeader("host", req.headers.host || "");
      },
      proxyRes: (proxyRes, req, res) => {
        proxyRes.headers["Access-Control-Allow-Origin"] =
          req.headers.origin || "*";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET, POST, PUT, DELETE, OPTIONS";
        proxyRes.headers["Access-Control-Allow-Headers"] =
          "Content-Type, Authorization, Cookie";
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true"; // If cookies are involved
        console.log("Response headers modified with CORS:", proxyRes.headers);
      },
      error: (err, req, res) => {
        console.error("❌ Proxy error:", err);
      },
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
        ...srcReq.header,
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
        ...srcReq.header,
        cookie: srcReq.headers.cookie || "",
      };
      return proxyReqOpts;
    },
  })
);

app.listen(process.env.PORT || 8000, () => {
  console.log(`gateway service is running on port :http://localhost:8000`);
});
