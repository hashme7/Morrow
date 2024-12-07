import { IRedisService, IWebSocketServer } from "../interfaces/providers.interface";
import { IRabbitMQService } from "../interfaces/rabbitMQ.interface";
import { IMessage } from "../interfaces/types/Data";
import { ISendMessage } from "../interfaces/usecases.interface";

export class SendMessage implements ISendMessage {
  constructor(private rabbitMQServie:IRabbitMQService,private redisService:IRedisService) {}
  async execute(message:IMessage) {
    try {
      await this.rabbitMQServie.publishMessage("chat_queue",message);
      await this.redisService.publish(`channel:room:${message.receiverId}`, JSON.stringify({
        ...message,
        timestamp: message.timestamp.toDateString(), 
      }))
      return {status:201,message:"success"}
    } catch (error) {
      console.error("Error creating message:", (error as Error).message);
      throw new Error("Failed to create message");
    }
  }
}
  