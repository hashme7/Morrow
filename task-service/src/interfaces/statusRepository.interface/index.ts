import mongoose from "mongoose";
import { IStatus } from "../response.interface";

export interface IStatusRepository{
    insertStatus(status:IStatus):Promise<IStatus>;
    findAStatus(id:string,team_id:mongoose.Types.ObjectId):Promise<IStatus | null>;
    findManyStatus(team_id:mongoose.Types.ObjectId):Promise<IStatus[]>
    findStatusAndUpdate(team_id:mongoose.Types.ObjectId,name:string,id:string):Promise<IStatus>
    findOneAndDelete(team_id:mongoose.Types.ObjectId,id:string):Promise<void>
}