import { IUser } from './types/user';
import { IAddMember, response } from './types/response';
import mongoose, { ObjectId } from 'mongoose';
import { ConsumeMessage } from 'amqplib';



export interface ISignUpCases {
    execute(userData:IUser):Promise<response>
}
export interface IVerifyCases {
    execute(userId:ObjectId,otp:number):Promise<response>
}
export interface IResendOtpCases {
    execute(userId:mongoose.Types.ObjectId):Promise<response>
}

export interface ILoginCases{
    execute(email:string,password:string):Promise<response>
}
export interface IUpdateNameCases{
    execute(name: string, userId: mongoose.Types.ObjectId): Promise<response>
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
export interface IGetUserCases{
    execute(userId:mongoose.Types.ObjectId):Promise<response>
}
export interface IChangeEmailCases{
    execute(userId : mongoose.Types.ObjectId,email:string):Promise<response>
}


export interface IChangePasswordCases{
    execute(cpassword: string,newPassword:string, userId: mongoose.Types.ObjectId):Promise<response>
}

export interface IGetTeamIds {
    execute(userId:string):Promise<response>
}

export interface IAddTeamMembers{
    execute(userId:mongoose.Types.ObjectId,teamId:mongoose.Types.ObjectId):Promise<IAddMember>;
}

export interface IGetTeamMembers{
    execute(projectId:string,page:number,limit:number):Promise<response>;
}

export interface IUpdateImg{
    execute(img:string,userId:mongoose.Types.ObjectId):Promise<response>
}

export interface IGetAllUsers{
    execute(limit:number,page:number):Promise<response>;
}
export interface ICreateRequest{
    execute(projectId:number,userId:mongoose.Types.ObjectId):Promise<response>;
}
export interface IGetRequests{
    execute(userId:mongoose.Types.ObjectId):Promise<response>;
}


export interface IUpdateProfile{
    execute(userId:string, field:string, value:string):Promise<response>;
}