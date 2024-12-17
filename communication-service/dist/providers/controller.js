"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../adaptors/chatController");
const socketio_1 = require("../infrastructure/framework/socketio");
const rabbitMq_1 = require("../infrastructure/rabbitMq");
const messageWorker_1 = require("../infrastructure/rabbitMq/messageWorker");
const chatRepository_1 = require("../infrastructure/repository/chatRepository");
const redis_1 = require("../infrastructure/service/redis");
const fetchMessages_1 = require("../usecases/fetchMessages");
const joinSocket_1 = require("../usecases/joinSocket");
const sendMessage_1 = require("../usecases/sendMessage");
const updateMsgSeen_1 = require("../usecases/updateMsgSeen");
const redisService = new redis_1.RedisService("localhost", 6379);
const chatRepository = new chatRepository_1.ChatRepository();
const rabbitMQService = new rabbitMq_1.RabbitMQService();
const messageWorker = new messageWorker_1.MessageWorker(rabbitMQService, chatRepository);
messageWorker.start();
const joinSocket = new joinSocket_1.JoinSocket(messageWorker);
const updateMsgSeen = new updateMsgSeen_1.UpdateMsgSeen(chatRepository);
const webSocketService = new socketio_1.WebSocketServer(9000, redisService, chatRepository, joinSocket, updateMsgSeen);
webSocketService.start();
const sendMessage = new sendMessage_1.SendMessage(rabbitMQService, redisService);
const fetchMessages = new fetchMessages_1.FetchMessages(chatRepository);
const chatController = new chatController_1.ChatController(sendMessage, fetchMessages);
exports.default = chatController;
