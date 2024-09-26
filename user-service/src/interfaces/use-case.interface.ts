import { IUser } from './types/user';
import { response } from './types/response';
import { ObjectId } from 'mongoose';
import { ConsumeMessage } from 'amqplib';


export interface IUseCase {
    createTeam(message: ConsumeMessage): unknown;
    googleLogin(token:string): any;
    verifyOtp(userId:ObjectId,otp: any): Promise<response>;
    signup(userData:IUser):Promise<response>
    resendOtp(userId:ObjectId):Promise<response>;
    login(email: string, password: string):Promise<response>;
    validateToken(token:string):Promise<response>;
    gitHubLogin(code:string):Promise<response>;
}