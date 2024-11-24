import mongoose, { ObjectId } from "mongoose";


export interface IUser {
    image?:string | null,
    _id?: mongoose.Types.ObjectId;              
    username: string;           
    password: string;           
    email: string;   
    phone?:number | null,
    fullName?:string | null,
    basedIn?:string | null,
    isProjectManager?: boolean;   
    registrationTime?: Date; 
    isVerified?: boolean;  
    role?: string; 
    createdAt?:Date,
    updatedAt?:Date,
}

export interface ITeam{
    _id:mongoose.Types.ObjectId;
    name:string,
    projectId:number;
}

export interface ITeamIds{
    team_id:mongoose.Types.ObjectId;
}
export interface IRequest{
    teamId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
}