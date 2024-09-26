"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Jwt {
    constructor() {
        this._secretKey = process.env.JWT_SECRET || "";
        if (!this._secretKey) {
            throw new Error("JWT secret key is not defined in the environment variables.");
        }
    }
    createAccessToken(id, role) {
        try {
            const payload = { id, role };
            return (0, jsonwebtoken_1.sign)(payload, this._secretKey, { expiresIn: "24h" });
        }
        catch (error) {
            console.log(error);
            return 'error on create acess token';
        }
    }
    createRefreshToken(id, role) {
        try {
            const payload = { id, role };
            return (0, jsonwebtoken_1.sign)(payload, this._secretKey, { expiresIn: "7d" });
        }
        catch (error) {
            console.log(error);
            return 'error on create refresh token';
        }
    }
    verifyToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, this._secretKey);
        }
        catch (error) {
            console.error("Invalid token error:", error);
            return null;
        }
    }
    verifyRefreshToken(refreshToken) {
        try {
            return (0, jsonwebtoken_1.verify)(refreshToken, this._secretKey);
        }
        catch (error) {
            console.error("Invalid refresh token error:", error);
            return null;
        }
    }
}
exports.default = Jwt;
