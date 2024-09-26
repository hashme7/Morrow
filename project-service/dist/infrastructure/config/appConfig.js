"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../routes/index"));
const morgan_1 = __importDefault(require("morgan"));
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, morgan_1.default)('tiny'));
        app.use('/', index_1.default);
        return app;
    }
    catch (error) {
        console.log(`error on spinning Project service : ${error}`);
    }
};
exports.createServer = createServer;
