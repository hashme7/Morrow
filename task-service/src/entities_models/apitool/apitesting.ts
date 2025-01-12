import mongoose, { Schema } from "mongoose";
import { IApi } from "../../interfaces/response.interface";

const ApiSchema: Schema = new Schema<IApi>({
  projectId: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    required: true,
  },
  body: {
    type: Schema.Types.Mixed,
    default: null,
  },
  response: {
    type: String,
    required:false,
  }
});
const apiModel = mongoose.model("ApiModel", ApiSchema);

export default apiModel;
