import { ObjectId } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { generateVerificationCode } from "../library/code-generator";

export class ResendOtp {
    private readonly repository;
    constructor(repository:IRepository){
        this.repository =  repository;
    }
    async execute (userId:ObjectId){
        try {
            const verificationCode = generateVerificationCode();
            await this.repository.saveOtp(userId, verificationCode);
            return {
              status: 201,
              message: "Otp created successfully",
            };
          } catch (error) {
            console.log(error);
            return {
              status: 500,
              message: "Internal server error",
            };
          }
    }
}