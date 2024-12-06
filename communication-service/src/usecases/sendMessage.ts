import { IChatRepository } from "../interfaces/chatRepository.interface";
import { SendMessageParams } from "../interfaces/types/requestTypes";

export class SendMessage {
  constructor(private chatRepository: IChatRepository) {}
  async execute({ senderId, receiverId, content }: SendMessageParams) {
    try {
      const message = await this.chatRepository.saveMessage({
        senderId,
        receiverId,
        content,
        status: "pending",
      } as SendMessageParams);
      return {status:201,message:"success",data:message}
    } catch (error) {
      console.error("Error creating message:", (error as Error).message);
      throw new Error("Failed to create message");
    }
  }
}
