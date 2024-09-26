import { Document ,ObjectId} from "mongoose";


export interface IOtp extends Document{
    user:ObjectId,
    code:number,
    expiresAt:Date
} 