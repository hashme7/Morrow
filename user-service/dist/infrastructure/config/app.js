"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)("tiny"));
        app.use(express_1.default.json({ limit: "50mb" }));
        app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
        app.use((0, cors_1.default)({
            origin: "https://morrow.hashim-dev007.online",
            credentials: true,
        }));
        app.use("/", userRoutes_1.default);
        return app;
    }
    catch (error) {
        console.log("error on spinning user service", error);
    }
};
exports.createServer = createServer;
