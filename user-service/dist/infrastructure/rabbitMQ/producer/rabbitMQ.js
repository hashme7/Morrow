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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const delay_1 = require("../../../library/delay");
class RabbitMQService {
    constructor() {
        this.maxRetries = 5;
        this.retryDelay = 2000;
        this.connect();
    }
    connect() {
        return __awaiter(this, arguments, void 0, function* (attempt = 1) {
            try {
                this.connection = yield amqplib_1.default.connect(process.env.RabbitMQ_URL);
                this.channel = yield this.connection.createChannel();
                console.log(`RabbitMQ is connected successfully.`);
            }
            catch (error) {
                console.log(`Error connecting RabbitMQ: ${error}`);
                if (attempt <= this.maxRetries) {
                    console.log(`Retrying to connect to RabbitMQ in ${this.retryDelay / 1000} seconds...`);
                    yield (0, delay_1.delay)(this.retryDelay);
                    return this.connect(attempt + 1);
                }
                else {
                    console.log(`Error on connecting RabbitMq ${error}`);
                    throw error;
                }
            }
        });
    }
    publish(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                throw new Error("Channel not initialized. Call connect() before publishing.");
            }
            try {
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                console.log(`Message sent to queue ${queue}: `, message);
            }
            catch (error) {
                console.log(`Failed to send message to queue ${queue}: ${error}`);
                throw error;
            }
        });
    }
}
exports.RabbitMQService = RabbitMQService;
