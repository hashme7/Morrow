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
exports.RabbitMQService = void 0;
const amqplib_1 = require("amqplib");
class RabbitMQService {
    constructor() {
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield (0, amqplib_1.connect)("amqp://localhost");
                this.channel = yield this.connection.createChannel();
                console.log("Connected to RabbitMQ and channel created.");
            }
            catch (error) {
                console.error("Error connecting to RabbitMQ:", error);
                throw error;
            }
        });
    }
    publishMessage(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.connect();
            }
            console.log(`publishMessage:${queue}:${message}`);
            console.log("Message before sending:", JSON.stringify(message));
            yield this.channel.assertQueue(queue, { durable: true });
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        });
    }
    consumeMessages(queue, onMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.connect();
            }
            yield this.channel.assertQueue(queue, { durable: true });
            this.channel.consume(queue, (msg) => {
                if (msg) {
                    const message = JSON.parse(msg.content.toString());
                    onMessage(message);
                    this.channel.ack(msg);
                }
            });
        });
    }
}
exports.RabbitMQService = RabbitMQService;
