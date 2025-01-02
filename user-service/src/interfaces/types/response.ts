import mongoose, { Document, Types } from "mongoose";
import { IUser } from "./user";
import { IProject } from "./project";

export interface response {
    status:number,
    message:string,
    tokens?:{
      accessToken?:string | null | undefined,
      refreshToken?:string | null | undefined
      user?:IUser |null
    },
    data?:IUser  | {team_id:mongoose.Types.ObjectId}[]| null | IUser[] | string[] | IFinalRequests[] | IRole,
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
export interface IFinalRequests {
  note: string;
  projectStartDate: Date | null;
  projectEndDate: Date | null;
  id: number;
  name: string;
  projectDescription: string;
  teamId: string;
  plannedStartDate: Date | undefined;
  plannedEndDate: Date | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface IRole {
  user_account: Types.ObjectId;
  team_id: Types.ObjectId;
  role: "Developer" | "TeamLead" | "ProjectManager";
}