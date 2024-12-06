"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Controller initialized!");
const chatController_1 = require("../adaptors/chatController");
const socketio_1 = require("../infrastructure/framework/socketio");
const rabbitMq_1 = require("../infrastructure/rabbitMq");
const messageWorker_1 = require("../infrastructure/rabbitMq/messageWorker");
const chatRepository_1 = require("../infrastructure/repository/chatRepository");
const redis_1 = require("../infrastructure/service/redis");
const sendMessage_1 = require("../usecases/sendMessage");
const redisService = new redis_1.RedisService("localhost", 6379);
const chatRepository = new chatRepository_1.ChatRepository();
const webSocketService = new socketio_1.WebSocketServer(9000, redisService, chatRepository);
webSocketService.start();
const rabbitMQService = new rabbitMq_1.RabbitMQService();
new messageWorker_1.MessageWorker(rabbitMQService, chatRepository);
const sendMessage = new sendMessage_1.SendMessage(rabbitMQService, redisService);
const chatController = new chatController_1.ChatController(sendMessage);
exports.default = chatController;
