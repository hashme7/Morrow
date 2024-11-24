"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const morrow_common_1 = require("morrow-common");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = morrow_common_1.JWTService.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token, unauthorized" });
    }
    if (decoded) {
        return res
            .status(403)
            .json({
            message: `Access denied !}`,
        });
    }
    next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=AuthMiddleware.js.map