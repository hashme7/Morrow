import { ObjectId } from "mongoose";
import { ITeam, IUser } from "./types/user";
import { IAddTeamMessage } from "./types/response";

export interface IRepository{
    markUserAsVerified(userId: ObjectId): Promise<void>;
    verifyOtp(userId: ObjectId, otp: number): unknown;
    saveOtp(id: ObjectId | undefined, verificationCode: number): unknown;
    findByEmail(email:string):Promise<IUser | null >
    insertOne(userData:IUser):Promise<IUser>
    createTeam(data:IAddTeamMessage):Promise<ITeam>
}