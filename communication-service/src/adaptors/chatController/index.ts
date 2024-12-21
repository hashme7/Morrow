import { Request, Response } from "express";
import { IGetMessage, ISendMessage } from "../../interfaces/usecases.interface";

export class ChatController {
  constructor(
    private sendMessage: ISendMessage,
    private fetchMessage: IGetMessage
  ) {}
  async sendChat(req: Request, res: Response) {
    try {
      const senderId = req.query.senderId as string;   
      const receiverId = req.query.receiverId as string;
      const content = req.query.content as string;
      if (!senderId || !receiverId || !content) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
      const { status, message } = await this.sendMessage.execute({
        senderId,
        receiverId,
        content,
        status: "pending",
        timestamp: new Date(),   
        readBy: [],
      });
      res.status(status).json({ message });
    } catch (error) {
      console.error("Error creating message:", (error as Error).message);
      throw error;
    } 
  }  
  async getMessage(req: Request, res: Response) {
    try {
      const roomId = req.query.receiverId as string;
      const page = req.query.page;
      const messages = await this.fetchMessage.execute(roomId, Number(page));
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error getting message:", (error as Error).message);
      throw error;
    }
  }
}
