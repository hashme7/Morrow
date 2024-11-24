import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  teamId: mongoose.Types.ObjectId;
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
}

const TaskSchema = new Schema<ITask>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    name: { type: String, required: true },
    description: { type: String },
    plannedStartDate: { type: Date, required: true },
    plannedEndDate: { type: Date, required: true },
    actualStartDate: { type: Date },
    actualEndDate: { type: Date },
    status: { type: String },
    priority: { type: String },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
