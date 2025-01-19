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
const corsOptions = {
    origin: ["http://localhost:5173", "https://morrow-frontend.vercel.app"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cookie_parser_1.default)());
app.use("/health", (req, res) => {
    res.status(200).json({ message: "gateway is running successfully on 8000" });
});
console.log("process", process.env.PROJECT_SERVICE);
app.use("/project", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.PROJECT_SERVICE || "http://localhost:4000"));
app.use("/user", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.USER_SERVICE || "http://localhost:3000"));
app.use("/communicate", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.COMMUNICATION_SERVICE || "http://localhost:2000"));
app.use("/task", dist_1.authenticate, (0, express_http_proxy_1.default)(process.env.TASK_SERVICE || "http://localhost:5000"));
app.use("/auth", (0, express_http_proxy_1.default)(process.env.AUTH_SERVICE || "http://localhost:9090"));
app.listen(process.env.PORT || 8000, () => {
    console.log(`gateway service is running on port :http://localhost:8000`);
});
