"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)('tiny'));
        app.use(express_1.default.json({ limit: "50mb" }));
        app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
        const corsOptions = {
            origin: "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
        };
        app.use((0, cors_1.default)(corsOptions));
        app.options("*", (0, cors_1.default)(corsOptions));
        // app.use("/", userRouter);
        return app;
    }
    catch (error) {
        console.log("error on spinning user service", error);
    }
};
exports.createServer = createServer;
