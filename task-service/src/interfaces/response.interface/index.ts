import { ObjectId } from "mongoose";

export interface ISubTask {
  name: string;
  description: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualEndDate: Date;
  actualStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
  taskId: ObjectId;
  priority: string;
  status:string
}

export interface ITask extends Document {
  teamId: ObjectId;
  name: string;
  description: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  subTaskIds: Array<ISubTask>;
}
