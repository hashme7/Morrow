import { ObjectId } from "mongoose";

export interface IUserData{
    _id?:ObjectId,
    email:string,
    image:string,
    username:string,
    fullName:string,
    basedIn:string,
    password:string,
    jobTitle:string,
    isProjectManager?:string,
    isVerified?:boolean,
}