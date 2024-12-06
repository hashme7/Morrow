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
exports.SendMessage = void 0;
class SendMessage {
    constructor(rabbitMQServie, redisService) {
        this.rabbitMQServie = rabbitMQServie;
        this.redisService = redisService;
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.rabbitMQServie.publishMessage("chat_queue", message);
                this.redisService.publish(`room:${message.receiverId}:new_message`, message);
                return { status: 201, message: "success" };
            }
            catch (error) {
                console.error("Error creating message:", error.message);
                throw new Error("Failed to create message");
            }
        });
    }
}
exports.SendMessage = SendMessage;
