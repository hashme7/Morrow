import { Request, Response, NextFunction } from 'express';
import Jwt from '../providers/jwt/jwt';
import { JwtPayload } from 'jsonwebtoken';

const jwt = new Jwt();

const authenticateRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
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

export default authenticateRole;
