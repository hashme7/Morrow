import mailerInterface from ".././interface/nodemailer.interface";
import { IRepository } from ".././interface/repository.interface";
import { IResponse } from ".././interface/responses.interface";
import {IUserData } from ".././interface/requests.interface";
import { generateVerificationCode } from "../libraries/code-generator";
import bcrypt from 'bcryptjs';

export class signupUser {
  private repository: IRepository;
  private readonly nodemailer: mailerInterface;
  private readonly saltRounds: number = 10;
  constructor(repository: IRepository,nodemailer:mailerInterface) {
    this.repository = repository;
    this.nodemailer = nodemailer;
  }
  async execute(userData: IUserData) :Promise<IResponse>{
    try {
      const user = await this.repository.findByEmail(userData.email);
      if (user && user.isVerified) {
        console.log("user already exists...");
        return {
          status: 409,
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
      const res =await this.nodemailer.sendMail(userData.email, verificationCode);
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
