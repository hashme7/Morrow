import mongoose from "mongoose";
import { ITask } from "../response.interface";

export interface ICreateTask {
  execute(taskData: Omit<ITask, "createdAt" | "updatedAt">): Promise<ITask>;
}

export interface IDeleteTask {
  execute(taskId: mongoose.Types.ObjectId): Promise<void>;
}
