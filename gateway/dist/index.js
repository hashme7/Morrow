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
const authMiddleware_1 = require("morrow-common/dist/middlewares/authMiddleware");
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cookie_parser_1.default)());
app.use('/project', authMiddleware_1.authenticate, (0, express_http_proxy_1.default)('http://localhost:4000'));
app.use('/user', authMiddleware_1.authenticate, (0, express_http_proxy_1.default)('http://localhost:3000'));
app.use('/', (0, express_http_proxy_1.default)('http://localhost:1000'));
app.use('/task', authMiddleware_1.authenticate, (0, express_http_proxy_1.default)('http://localhost:5000'));
app.use('/communicate', authMiddleware_1.authenticate, (0, express_http_proxy_1.default)('http://localhost:2000'));
app.listen(8000, () => {
    console.log(`gateway service is running on port :http://localhost:8000`);
});
