import { ChatController } from "../adaptors/chatController";
import { WebSocketServer } from "../infrastructure/framework/socketio";
import { RabbitMQService } from "../infrastructure/rabbitMq";
import { MessageWorker } from "../infrastructure/rabbitMq/messageWorker";
import { ChatRepository } from "../infrastructure/repository/chatRepository";
import { RedisService } from "../infrastructure/service/redis";
import { SendMessage } from "../usecases/sendMessage";

const redisService = new RedisService("localhost", 6379);

const chatRepository = new ChatRepository();

const webSocketService = new WebSocketServer(9000, redisService, chatRepository);
export const startSocketService = async()=>{
    await webSocketService.start();
}

const rabbitMQService =new RabbitMQService();
new MessageWorker(rabbitMQService,chatRepository);

const sendMessage = new SendMessage(rabbitMQService,redisService);

const chatController = new ChatController(sendMessage);

export default chatController;