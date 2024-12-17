import { ChatController } from "../adaptors/chatController";
import { WebSocketServer } from "../infrastructure/framework/socketio";
import { RabbitMQService } from "../infrastructure/rabbitMq";
import { MessageWorker } from "../infrastructure/rabbitMq/messageWorker";
import { ChatRepository } from "../infrastructure/repository/chatRepository";
import { RedisService } from "../infrastructure/service/redis";
import { FetchMessages } from "../usecases/fetchMessages";
import { JoinSocket } from "../usecases/joinSocket";
import { SendMessage } from "../usecases/sendMessage";
import { UpdateMsgSeen } from "../usecases/updateMsgSeen";
const redisService = new RedisService("localhost", 6379);
const chatRepository = new ChatRepository();
const rabbitMQService = new RabbitMQService();
const messageWorker = new MessageWorker(rabbitMQService, chatRepository);
messageWorker.start();
const joinSocket = new JoinSocket(messageWorker);
const updateMsgSeen = new UpdateMsgSeen(chatRepository);
const webSocketService = new WebSocketServer(
  9000,
  redisService,
  chatRepository,
  joinSocket,
  updateMsgSeen,
);
webSocketService.start();
const sendMessage = new SendMessage(rabbitMQService, redisService);
const fetchMessages =new FetchMessages(chatRepository);
const chatController = new ChatController(sendMessage,fetchMessages);
export default chatController;
