import { ObjectId } from "mongoose";


export interface IUser {
    id?: ObjectId;              
    username: string;           
    password: string;           
    email: string;            
    isProjectManager?: boolean;   
    registrationTime?: Date; 
    isVerified?: boolean;  
    role: string; 
}

export interface ITeam{
    id?:ObjectId;
    name:string,
    projectId:number;
}
