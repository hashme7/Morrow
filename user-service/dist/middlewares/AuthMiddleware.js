"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../providers/jwt/jwt"));
const jwt = new jwt_1.default();
const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token, unauthorized" });
        }
        if (decoded.role !== requiredRole) {
            return res.status(403).json({ message: `Access denied for ${decoded.role}, requires ${requiredRole}` });
        }
        next();
    };
};
exports.default = authenticateRole;
