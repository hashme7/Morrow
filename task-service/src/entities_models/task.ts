import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces/response.interface";

const TaskSchema = new Schema<ITask>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    name: { type: String, required: true },
    description: { type: String },
    plannedStartDate: { type: Date, required: true },
    plannedEndDate: { type: Date, required: true },
    status: { type: Schema.Types.ObjectId,ref:"Status"},
    priority: { type: String },
    subTaskIds:[{ type: Schema.Types.ObjectId, ref: "SubTask" }],
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
