import { ChatController } from "../adaptors/chatController";
import { WebSocketServer } from "../infrastructure/framework/socketio";
import { RabbitMQService } from "../infrastructure/rabbitMq";
import { ChatRepository } from "../infrastructure/repository/chatRepository";
import { RedisService } from "../infrastructure/service/redis";
import { SendMessage } from "../usecases/sendMessage";

const redisService = new RedisService("localhost", 6379);

const chatRepository = new ChatRepository();

const webSocketService = new WebSocketServer(443, redisService, chatRepository);

const rabbitMQServie =new RabbitMQService();

webSocketService.start();
const sendMessage = new SendMessage(rabbitMQServie,redisService);

const chatController = new ChatController(sendMessage);

export default chatController;