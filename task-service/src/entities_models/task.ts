import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces/response.interface";

const TaskSchema = new Schema<ITask>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    name: { type: String, required: true },
    status: { type: Schema.Types.ObjectId, ref: "Status" },
    assignee:[{type:Schema.Types.ObjectId}],
    priority: {
      type: String,
      enum: ["Urgent", "Low", "Normal", "High"],
      required: true,
    },
    subTaskIds: [{ type: Schema.Types.ObjectId, ref: "SubTask" }],
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
