"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const corsOptions = {
            origin: "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };
        app.use((0, cors_1.default)(corsOptions));
        app.options("*", (0, cors_1.default)(corsOptions));
        app.use("/", userRoutes_1.default);
        return app;
    }
    catch (error) {
        console.log("error on spinning user service", error);
    }
};
exports.createServer = createServer;
