import { Document } from "mongoose";
import { IMessage } from "../Data";

export interface GetMessagesResponse {
    messages: IMessage[];
    metadata: {
      totalMessages: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    };
}

export interface SendMessageReturn{
  status:number,
  message:string,
  data:IMessage,
}