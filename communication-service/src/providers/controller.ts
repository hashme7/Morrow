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

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });


const redisService = new RedisService(process.env.REDISHOST || "localhost", Number(process.env.REDISPORT) || 6379, process.env.REDISPASS,process.env.REDISUSER || "default");
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
