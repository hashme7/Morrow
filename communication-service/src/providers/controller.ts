import { ChatController } from "../adaptors/chatController";
import { WebSocketServer } from "../infrastructure/framework/socketio";
import { RabbitMQService } from "../infrastructure/rabbitMq";
import { MessageWorker } from "../infrastructure/rabbitMq/messageWorker";
import { ChatRepository } from "../infrastructure/repository/chatRepository";
import { RedisService } from "../infrastructure/service/redis";
import { SendMessage } from "../usecases/sendMessage";

const redisService = new RedisService("localhost", 6379);

const chatRepository = new ChatRepository();

new WebSocketServer(9000, redisService, chatRepository);

const rabbitMQService =new RabbitMQService();
new MessageWorker(rabbitMQService,chatRepository);

// webSocketService.start();
const sendMessage = new SendMessage(rabbitMQService,redisService);

const chatController = new ChatController(sendMessage);

export default chatController;