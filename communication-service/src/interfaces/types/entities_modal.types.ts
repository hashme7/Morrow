import { Document, ObjectId } from "mongoose";

export interface ChatMessage extends Document{
    senderId: string;
    receiverId:string,
    status: "pending" | "delivered" | "seen";
    readBy:ObjectId[];
    content: string;
    timestamp: Date;
}