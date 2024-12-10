import mongoose, { Schema } from "mongoose";
import { IStatus } from "../interfaces/response.interface";


const StatusSchema = new Schema<IStatus>({
    name:{
        type:String
    },
    id:{
        type:String,
        required:true
    }
})

export const Status = mongoose.model<IStatus>("Status",StatusSchema)
