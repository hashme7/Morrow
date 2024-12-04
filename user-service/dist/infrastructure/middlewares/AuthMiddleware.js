"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morrow_common_1 = require("morrow-common");
const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = morrow_common_1.JWTService.verifyToken(token);
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
