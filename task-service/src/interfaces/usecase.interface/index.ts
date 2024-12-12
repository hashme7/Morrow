import { IReqTask, IStatus } from './../response.interface/index';
import mongoose from "mongoose";
import { ITask } from "../response.interface";

export interface ICreateTask {
  execute(taskData: IReqTask): Promise<ITask>;
}

export interface IDeleteTask {
  execute(taskId: mongoose.Types.ObjectId): Promise<void>;
}

export interface ICreateStatus{
  execute(status:IStatus):Promise<IStatus>;
}
export interface IGetStatus{
  execute(team_id:mongoose.Types.ObjectId):Promise<IStatus[]>
}
export interface IUpdateStatus{
  execute(team_id:mongoose.Types.ObjectId,name:string,id:string):Promise<IStatus>;
}
export interface IDeleteStatus{
  execute(team_id:mongoose.Types.ObjectId,id:string):Promise<void>;
}