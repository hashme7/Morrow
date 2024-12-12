import mongoose from "mongoose";
import {IReqTask, ITask} from '../response.interface/index'

export interface ITaskRepository {
    createTask(task:  IReqTask): Promise<ITask>;
    deleteProject(taskId:mongoose.Types.ObjectId):Promise<void>;
    deleteTasksOnColumn(team_id:mongoose.Types.ObjectId,id:string):Promise<void>
  }
  