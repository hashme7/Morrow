import { ChatController } from "../adaptors/chatController";
import { WebSocketServer } from "../infrastructure/framework/socketio";
import { ChatRepository } from "../infrastructure/repository/chatRepository";
import { RedisService } from "../infrastructure/service/redis";

const redisService = new RedisService("localhost", 6379);

const chatRepository = new ChatRepository();

const webSocketService = new WebSocketServer(443, redisService, chatRepository);

webSocketService.start();

const chatController = new ChatController(webSocketService);

export default chatController;