import mongoose from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import bcrypt from "bcryptjs";

export class ChangePassword {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }
  async execute(
    cpassword: string,
    newPassword: string,
    userId: mongoose.Types.ObjectId
  ) {
    try {
      const user = await this.repository.getUser(userId);
      if (!user || !(await bcrypt.compare(cpassword, user.password))) {
        return {
          status: 401,
          message: "invalid credentials OR user is not there",
          valid: false,
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const udpatedUser = await this.repository.changePassword(
          userId,
          hashedPassword
        );
        return {
          status: 200,
          message: "password changed successfully",
          data: udpatedUser,
        };
      }
    } catch (error) {
      return { status: 500, message: error };
    }
    
  }
}
