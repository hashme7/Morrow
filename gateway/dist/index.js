"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use('/project', (0, express_http_proxy_1.default)('http://localhost:4000'));
app.use('/', (0, express_http_proxy_1.default)('http://localhost:3000'));
app.listen(8000, () => {
    console.log(`gateway service is running on port :http://localhost:8000`);
});
//# sourceMappingURL=index.js.map