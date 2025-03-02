import { IRepository } from "../interface/repository.interface";
import { JWTService } from "morrow-common";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class ResetPassword {
  constructor(readonly repository: IRepository) {}
  async execute({ token, password }: { token: string; password: string }) {
    try {
      const decoded: JwtPayload = JWTService.verifyToken(token);
      if (!decoded) return { status: 403, message: "Token is Invalid token" };
      const isUser = await this.repository.findById(decoded.id);
      console.log("isUser:", isUser);
      if (!isUser) {
        return { status: 400, message: "user is not there" };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.repository.updatePassword(decoded.id, hashedPassword);
        return { status: 200, message: "password changed successfully" };
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error instanceof TokenExpiredError) {
        return {
          status: 401,
          message: "Token expired. Please request a new password reset link.",
        };
      }
      return {
        status: 500,
        message:
          error instanceof Error ? error.message : "Internal server error.",
      };
    }
  }
}
