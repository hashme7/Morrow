import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
    task_id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate?: Date;
    actualEndDate?: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const ActivitySchema = new Schema<IActivity>(
    {
      task_id: { type: Schema.Types.ObjectId, ref: "Task", required: true },
      name: { type: String, required: true },
      description: { type: String },
      plannedStartDate: { type: Date, required: true },
      plannedEndDate: { type: Date, required: true },
      actualStartDate: { type: Date },
      actualEndDate: { type: Date },
      status: { type: String },
    },
    { timestamps: true }
  );
  
  export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
  