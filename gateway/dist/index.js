"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dist_1 = require("morrow-common/dist");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
app.set("trust proxy", 1);
console.log("truestedkskak..................................");
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://morrow-frontend.vercel.app",
        "https://morrow-frontend-git-main-hashme7s-projects.vercel.app",
        "https://morrow-frontend-pq1y24igi-hashme7s-projects.vercel.app",
    ],
    credentials: true,
};
app.use((req, res, next) => {
    console.log("🔎 CORS Debug:", req.headers.origin);
    console.log("🛠 Allowed Origins:", corsOptions.origin);
    next();
});
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        res.sendStatus(200);
        return;
    }
    next();
});
app.use("/health", (req, res) => {
    console.log("health checking... 123");
    res.status(200).json({ message: "gateway is running successfully on 8000" });
});
console.log("process", process.env.PROJECT_SERVICE);
app.use("/project", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.PROJECT_SERVICE || "http://localhost:4000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = Object.assign(Object.assign({}, proxyReqOpts.headers), { cookie: srcReq.headers.cookie || "" });
        return proxyReqOpts;
    },
}));
app.use("/user", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.USER_SERVICE || "http://localhost:3000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = Object.assign(Object.assign({}, proxyReqOpts.headers), { cookie: srcReq.headers.cookie || "" });
        return proxyReqOpts;
    },
}));
app.use("/communicate", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.COMMUNICATION_SERVICE || "http://localhost:2000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = Object.assign(Object.assign({}, proxyReqOpts.headers), { cookie: srcReq.headers.cookie || "" });
        return proxyReqOpts;
    },
}));
app.use("/task", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.TASK_SERVICE || "http://localhost:5000", {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = Object.assign(Object.assign({}, proxyReqOpts.headers), { cookie: srcReq.headers.cookie || "" });
        return proxyReqOpts;
    },
}));
app.use("/auth", (0, express_http_proxy_1.default)(process.env.AUTH_SERVICE || "http://localhost:9090", {
    userResHeaderDecorator(headers, userReq, userRes) {
        console.log("🔍 Response Headers from Auth Service:", headers);
        return headers;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = Object.assign(Object.assign({}, proxyReqOpts.headers), { cookie: srcReq.headers.cookie || "" });
        return proxyReqOpts;
    },
}));
app.listen(process.env.PORT || 8000, () => {
    console.log(`gateway service is running on port :http://localhost:8000`);
});
