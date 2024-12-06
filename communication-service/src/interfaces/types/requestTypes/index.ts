export interface SendMessageParams {
  senderId: string;
  content: string;
  receiverId:string;
  status:"pending"|"delivered"|"seen";
}

export interface GetMessageParams {
  senderId?: string;
  receiverId?: string;
  page?: number;
  limit?: number;
}
