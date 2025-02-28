import { IRepository } from "../interface/repository.interface";
import { JWTService } from "morrow-common";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs'

export class ResetPassword {
  constructor(readonly repository: IRepository) {}
  async execute({ token, password }: { token: string; password: string }) {
    try {
      const decoded: JwtPayload = JWTService.verifyToken(token);
      if (!decoded) return { status: 400 ,message:"Token is worng"};
      const isUser = this.repository.findById(decoded.id);
      if (!isUser) {
        return { status: 400, message: "user is not there" };
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          10
        );
        await this.repository.updatePassword(decoded.id, hashedPassword);
        return { status: 200, message: "password changed successfully" };
      }
    } catch (error) {
      throw error;
    }
  }
}
