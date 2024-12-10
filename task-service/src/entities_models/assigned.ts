import { IAssigned } from "./../interfaces/response.interface/index";
import mongoose, { Schema } from "mongoose";

const AssignedSchema = new Schema<IAssigned>({
  task_id: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
  userAccountId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  assignedAt: { type: Date, default: Date.now },
  status: { type: String },
});

export const Assigned = mongoose.model<IAssigned>("Assigned", AssignedSchema);
