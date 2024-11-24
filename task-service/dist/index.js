"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/config/app");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dbConfig_1 = require("./infrastructure/config/dbConfig");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, dbConfig_1.DBConfig)();
        const app = (0, app_1.createServer)();
        const port = process.env.PORT || 5000;
        app === null || app === void 0 ? void 0 : app.listen(port, () => {
            console.log(`task-service successfully running on port ${port}`);
        });
    }
    catch (error) {
        console.log(`task service : Error on starting server ${error}`);
    }
});
startServer();
