import { Document, ObjectId } from "mongoose";
import { IUserData } from "../requests.interface";

export interface IRepository {
  findByEmail(email: string): Promise<IUserData | null>;
  insertOne(userData: IUserData): Promise<IUserData>;
  saveOtp(id: ObjectId | undefined, verificationCode: number): unknown;
  verifyOtp(userId: ObjectId, otp: number): unknown;
  markUserAsVerified(userId: ObjectId): Promise<void>;
  findById(userId: ObjectId): Promise<(IUserData & Document) | null>;
  updatePassword(userId: ObjectId, password: string): Promise<boolean>;
}
