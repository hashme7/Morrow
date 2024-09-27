"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../' });
exports.config = {
    DB_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/Users',
    PORT: process.env.PORT || 3000,
    GMAIL: process.env.GMAIL || 'morrow.shp@gmail.com',
    GPASSWORD: process.env.GPASSWORD || 'dhaupxvdrvjptfpb',
};
