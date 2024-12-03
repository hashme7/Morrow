import mongoose, { Schema } from "mongoose";
import { ISubTask } from "../interfaces/response.interface";

const SubTaskSchema = new Schema<ISubTask>(
  {
    name: { type: String, required: true },
    description: { type: String },
    plannedStartDate: { type: Date, required: true },
    plannedEndDate: { type: Date, required: true },
    actualStartDate: { type: Date },
    actualEndDate: { type: Date },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    priority: {
      type: String,
      enum: ["Urgent", "Low", "Normal", "High"], 
      required: true,
    },
    status: {
      type: String,
      default: "none", 
    },
  },
  { timestamps: true } 
);

export const SubTask = mongoose.model<ISubTask>("SubTask", SubTaskSchema);
