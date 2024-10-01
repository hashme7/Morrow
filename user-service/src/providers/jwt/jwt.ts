import { sign, verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Jwt {
    private _secretKey: string;

    constructor() {
        this._secretKey = process.env.JWT_SECRET || "";
        if (!this._secretKey) {
            throw new Error("JWT secret key is not defined in the environment variables.");
        }
    }

    createAccessToken(id: string, role: string): string {
        try {
            const payload = { id, role };
            return sign(payload, this._secretKey, { expiresIn: "24h" });
        } catch (error) {
            console.log(error);
            return 'error on create acess token'
        }
    }

    createRefreshToken(id: string, role: string): string {
        try {
            const payload = { id, role };
            return sign(payload, this._secretKey, { expiresIn: "7d" });
        } catch (error) {
            console.log(error)
            return 'error on create refresh token'
        }
    }

    verifyToken(token: string): JwtPayload | null {
        try {
            return verify(token, this._secretKey) as JwtPayload;
        } catch (error: any) {
            console.error("Invalid token error:", error);
            return null;
        }
    }

    verifyRefreshToken(refreshToken: string): JwtPayload | null {
        try {
            return verify(refreshToken, this._secretKey) as JwtPayload;
        } catch (error: any) {
            console.error("Invalid refresh token error:", error);
            return null;
        }
    }
}

export default Jwt;
