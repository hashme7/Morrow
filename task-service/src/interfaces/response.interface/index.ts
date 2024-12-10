import  { ObjectId } from "mongoose";

export interface ISubTask {
  name: string;
  description: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
  taskId: ObjectId;
  priority: string;
  status:ObjectId
}

export interface ITask extends Document {
  teamId: ObjectId;
  name: string;
  description: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  status: ObjectId;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  subTaskIds: Array<ISubTask>;
}
export interface IAssigned extends Document {
  task_id: ObjectId;
  userAccountId: ObjectId;
  roleId: ObjectId;
  assignedAt: Date;
  status: string;
}

export interface IStatus extends Document{
  name:string,
  id:string,
}