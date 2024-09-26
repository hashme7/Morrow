import { JwtPayload } from "jsonwebtoken";

export interface IJwt {
    createAccessToken(id: string, role: string): string;
    createRefreshToken(id: string, role: string): string;
    verifyToken(token: string): JwtPayload | null;
}
