import { ObjectId } from 'mongoose';
import { IUserData } from '../requests.interface';
import { IResponse, IValidateResponse } from '../responses.interface';


export interface ISignUp{
    execute(userData:IUserData):Promise<IResponse>;
}
export interface IVerifyOtp{
    execute(userId:ObjectId,otp:number):Promise<IResponse>;
}
export interface IReIssueOtp {
    execute(userId:ObjectId):Promise<IResponse>;
}
export interface ILoginUser{
    execute(email:string,password:string):Promise<IResponse>;
}

export interface IAuthenticateToken{
    execute(token:string):Promise<IValidateResponse>;
}
export interface IGoogleAuth{
    execute(token:string):Promise<IResponse>
}
export interface IGitHubAuth{
    execute(code:string):Promise<IResponse>
}
export interface IForgotPassword{
    execute(email:string):Promise<IResponse>
}
export interface IPasswordVerify{
    execute({ token , password}:{ token: string; password: string }):Promise<IResponse>
}