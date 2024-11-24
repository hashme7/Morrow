import mongoose, { Document } from "mongoose";
import { IUser } from "./user";

export interface response {
    status:number,
    message:string,
    tokens?:{
      accessToken?:string | null | undefined,
      refreshToken?:string | null | undefined
      user?:IUser |null
    },
    data?:IUser  | {team_id:mongoose.Types.ObjectId}[]| null | IUser[] | string[],
    valid?:boolean,
    userId?:mongoose.Types.ObjectId,
    totalItems?:number,
    totalPages?:number,
}

export interface IAddTeamMessage{
  projectId:number,
  teamId:string,
  projectName:string,
  userId:string
}

export interface IAddMember extends Document{
  team_id:mongoose.Types.ObjectId,
  user_account:mongoose.Types.ObjectId,
}