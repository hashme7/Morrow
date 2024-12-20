import { ObjectId } from "mongoose";
import { IRepository } from "../interface/repository.interface";
import { IResponse } from "../interface/responses.interface";

export class VerifyOtp {
    private readonly repository: IRepository;
    constructor(repository: IRepository) {
      this.repository = repository;
    }
    async execute(userId:ObjectId,otp:number) :Promise<IResponse>{
      try {
        const isOtpValid = await this.repository.verifyOtp(userId, otp);
        if (!isOtpValid) {
          return {
            status: 400,
            message: "Invalid or expired OTP",
          };
        }
        await this.repository.markUserAsVerified(userId);
        return {
          status: 200,
          message: "Verification successful",
        };
      } catch (error) {
        console.error(`Error in verify OTP use case: ${error}`);
        return {
          status: 500,
          message: "Internal server error",
        };
      }
    }
  }