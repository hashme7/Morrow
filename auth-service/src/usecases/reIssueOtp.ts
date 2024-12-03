import { ObjectId } from "mongoose";
import { IRepository } from "../interface/repository.interface";
import { generateVerificationCode } from "../libraries/code-generator";

export class ReIssueOtp {
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