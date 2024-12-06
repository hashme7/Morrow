import { Request, Response } from "express";
import { ISendMessage } from "../../interfaces/usecases.interface";

export class ChatController {
  constructor(private sendMessage: ISendMessage) {}
  async sendChat(req: Request, res: Response) {
    try {
      const { senderId, receiverId, content } = req.body;
      if (!senderId || !receiverId || !content) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
      const { status, message } = await this.sendMessage.execute({
        senderId,
        receiverId,
        content,
        status: "pending"
      });
      res.status(status).json({message});
    } catch (error) {
      console.error("Error creating message:", (error as Error).message);
      throw error;
    }
  }
  getMessage() {}
}
