"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocketService = void 0;
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
const startSocketService = () => __awaiter(void 0, void 0, void 0, function* () {
    yield webSocketService.start();
});
exports.startSocketService = startSocketService;
const rabbitMQService = new rabbitMq_1.RabbitMQService();
new messageWorker_1.MessageWorker(rabbitMQService, chatRepository);
const sendMessage = new sendMessage_1.SendMessage(rabbitMQService, redisService);
const chatController = new chatController_1.ChatController(sendMessage);
exports.default = chatController;
