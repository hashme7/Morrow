import { sign, verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET || "secretjwtKey";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export class JWTService {
  static createAccessToken(id: string, role: string): string {
    try {
      console.log(secretKey, "kasdjkfaksdfkaskdfkasdkfjasdf");
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      const payload = { id, role };
      return sign(payload, secretKey, { expiresIn: "24h" });
    } catch (error) {
      console.log(error);
      return "error on create acess token";
    }
  }

  static createRefreshToken(id: string, role: string): string {
    try {
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      const payload = { id, role };
      return sign(payload, secretKey, { expiresIn: "7d" });
    } catch (error) {
      console.log(error);
      return "error on create refresh token";
    }
  }

  static verifyToken(token: string): CustomJwtPayload {
    try {
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      return verify(token, secretKey) as CustomJwtPayload;
    } catch (error: any) {
      console.error("Invalid token error:", error);
      throw error;
    }
  }
}
