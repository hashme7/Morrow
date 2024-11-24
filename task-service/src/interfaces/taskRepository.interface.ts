import mongoose from "mongoose";
import { ITask } from "../entities_models/task";

export interface ITaskRepository {
    createTask(task:  Omit<ITask , "createdAt" | "updatedAt">): Promise<ITask>;
    deleteProject(taskId:mongoose.Types.ObjectId):Promise<void>;
  }
  