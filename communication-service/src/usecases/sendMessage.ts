import { IRedisService } from "../interfaces/providers.interface";
import { IRabbitMQService } from "../interfaces/rabbitMQ.interface";
import { IMessage } from "../interfaces/types/Data";
import { ISendMessage } from "../interfaces/usecases.interface";

export class SendMessage implements ISendMessage {
  constructor(private rabbitMQServie:IRabbitMQService,private redisService:IRedisService) {}
  async execute(message:IMessage) {
    try {
      this.rabbitMQServie.publishMessage("chat_queue",message);
      this.redisService.publish(`room:${message.receiverId}:new_message`, message)
      return {status:201,message:"success"}
    } catch (error) {
      console.error("Error creating message:", (error as Error).message);
      throw new Error("Failed to create message");
    }
  }
}
