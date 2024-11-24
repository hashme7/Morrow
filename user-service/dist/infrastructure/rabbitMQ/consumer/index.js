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
exports.AddTeamConsumer = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const rabbitMQConfig_1 = require("../config/rabbitMQConfig");
class AddTeamConsumer {
    constructor(createTeamCases) {
        this.createTeamCases = createTeamCases;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect(rabbitMQConfig_1.rabbitMQConfig.uri);
            this.channel = yield connection.createChannel();
            yield this.channel.assertQueue(rabbitMQConfig_1.rabbitMQConfig.queueName1);
            this.startConsuming();
        });
    }
    startConsuming() {
        return __awaiter(this, void 0, void 0, function* () {
            this.channel.consume(rabbitMQConfig_1.rabbitMQConfig.queueName1, (message) => __awaiter(this, void 0, void 0, function* () {
                if (message) {
                    try {
                        const projectData = message.content.toString();
                        this.channel.ack(message);
                        yield this.createTeamCases.execute(message);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }));
        });
    }
}
exports.AddTeamConsumer = AddTeamConsumer;
