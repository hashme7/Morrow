import { IUser } from './types/user';
import { response } from './types/response';
import { ObjectId } from 'mongoose';
import { ConsumeMessage } from 'amqplib';


export interface IUseCase {
    createTeam(message: ConsumeMessage): unknown;
    // googleLogin(token:string): any;
    // verifyOtp(userId:ObjectId,otp: any): Promise<response>;
    // signup(userData:IUser):Promise<response>
    // resendOtp(userId:ObjectId):Promise<response>;
    // login(email: string, password: string):Promise<response>;
    validateToken(token:string):Promise<response>;
    // gitHubLogin(code:string):Promise<response>;
    // updateFullName(name:string,userId:ObjectId):Promise<response>;
}

export interface ISignUpCases {
    execute(userData:IUser):Promise<response>
}
export interface IVerifyCases {
    execute(userId:ObjectId,otp:number):Promise<response>
}
export interface IResendOtpCases {
    execute(userId:ObjectId):Promise<response>
}

export interface ILoginCases{
    execute(email:string,password:string):Promise<response>
}
export interface IUpdateNameCases{
    execute(name: string, userId: ObjectId): Promise<response>
}
export interface IGoogleLoginCases {
    execute(token:string):any;
}
export interface IGithubLoginCases{
    execute(code:string):Promise<response>
}
export interface IValidateTokenCases{
    execute(token:string):Promise<response>
}
export interface ICreateTeamCases{
    execute(message:ConsumeMessage):unknown;
}
