import mongoose, { Schema } from "mongoose";

export interface IAssigned extends Document {
    activity_id: mongoose.Types.ObjectId;
    userAccountId: mongoose.Types.ObjectId;
    roleId: mongoose.Types.ObjectId;
    assignedAt: Date;
    status: string;
  }
  
  const AssignedSchema = new Schema<IAssigned>(
    {
      activity_id: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
      userAccountId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
      assignedAt: { type: Date, default: Date.now },
      status: { type: String },
    }
  );
  
  export const Assigned = mongoose.model<IAssigned>("Assigned", AssignedSchema);
  