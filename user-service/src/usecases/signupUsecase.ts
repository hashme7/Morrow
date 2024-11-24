import mailerInterface from "../interfaces/nodemailer.interface";
import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { IUser } from "../interfaces/types/user";
import { generateVerificationCode } from "../library/code-generator";
import bcrypt from 'bcryptjs';

export class Signup {
  private repository: IRepository;
  private readonly nodemailer: mailerInterface;
  private readonly saltRounds: number = 10;
  constructor(repository: IRepository,nodemailer:mailerInterface) {
    this.repository = repository;
    this.nodemailer = nodemailer;
  }
  async execute(userData: IUser) :Promise<response>{
    try {
      const user = await this.repository.findByEmail(userData.email);
      if (user && user.isVerified) {
        console.log("user is verified");
        return {
          status: 400,
          message: "User already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        this.saltRounds
      );
      const hashedUser = { ...userData, password: hashedPassword };

      const newUser = await this.repository.insertOne(hashedUser);
      const verificationCode = generateVerificationCode();
      await this.repository.saveOtp(newUser._id, verificationCode);
      const res = this.nodemailer.sendMail(userData.email, verificationCode);
      if (res) {
        return {
          status: 201,
          message: "User created successfully",
          data: newUser,
        };
      } else {
        console.log("OTP failed");
        return {
          status: 400,
          message: "OTP send failed, try again",
        };
      }
    } catch (error) {
      console.log(`error on signup usecase:${error}`);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
