import mailerInterface from "../interface/nodemailer.interface";
import { IRepository } from "../interface/repository.interface";
import { JWTService } from "morrow-common";

export class ForgotPassword {
  constructor(
    readonly repository: IRepository,
    readonly nodemailer: mailerInterface
  ) {}
  async execute(email: string) {
    try {
      const isUser = await this.repository.findByEmail(email);
      if (!isUser) {
        return {
          status: 404,
          message: "The email is not associated with any account.",
        };
      }
      const userId = isUser._id;
      if (userId) {
        const token = JWTService.createForgotPassToken(String(userId));
        const link =
          process.env.FRONTEND_URL ||
          `https://morrow-frontend.vercel.app/changePassword/${token}`;
        await this.nodemailer.sendForgotPassLink(email, link);
        return { status: 201, message: "the link sharing successfully completed" };
      } else {
        return {
          status: 404,
          message: "The email is not associated with any account.",
        };
      }
    } catch (error) {
      return { status: 500, message: " Internal Server Error" };
    }
  }
}
