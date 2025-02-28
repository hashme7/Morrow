import { IUserData } from "../../interface/requests.interface";
import User from "../../entities/userModel";
import { Document, ObjectId } from "mongoose";
import { IOtp } from "../../interface/responses.interface";
import VerificationCode from "../../entities/verificationCodeModel";
import { IRepository } from "../../interface/repository.interface";

export class Repository implements IRepository{
  constructor() {}
  async updatePassword(userId: ObjectId, password: string): Promise<boolean> {
    try {
      await User.findOneAndUpdate({ _id: userId }, { $set: { password: password } });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async findById(userId: ObjectId): Promise<(IUserData & Document) | null> {
    try {
      return (await User.findOne({_id:userId}));
    } catch (error) {
      throw error;
    }
  }
  async insertOne(userData: IUserData): Promise<IUserData> {
    try {
      const filter = { email: userData.email };
      const update = { $set: userData };
      const options = { upsert: true, new: true };
      const newUser = await User.findOneAndUpdate(filter, update, options);
      return newUser as unknown as IUserData;
    } catch (error) {
      console.log(`Error on inserting user: ${error}`);
      throw error;
    }
  }
  async findByEmail(email: string): Promise<IUserData | null> {
    try {
      return (await User.findOne({ email: email })) as IUserData;
    } catch (error) {
      console.log(`error on finding by email on user: ${error}`);
      throw error;
    }
  }
  async saveOtp(userId: ObjectId, verificationCode: number): Promise<IOtp> {
    try {
      const otp = new VerificationCode({
        user: userId,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });
      const savedOtp = await otp.save();
      return savedOtp as unknown as IOtp;
    } catch (error) {
      console.log(`Error saving OTP: ${error}`);
      throw error;
    }
  }
  async markUserAsVerified(userId: ObjectId): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $set: { isVerified: true } });
    } catch (error) {
      console.error(`Error marking user as verified: ${error}`);
      throw error;
    }
  }
  async verifyOtp(userId: ObjectId, code: number): Promise<boolean> {
    try {
      const otpRecord = await VerificationCode.findOne({ user: userId }).sort({
        _id: -1,
      });
      if (!otpRecord) return false;
      const isOtpValid = otpRecord.code == code;
      return isOtpValid;
    } catch (error) {
      console.error(`Error verifying OTP: ${error}`);
      throw error;
    }
  }
}
