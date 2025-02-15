"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQConfig = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../../.env") });
console.log(process.env.RABBITMQ_URI, "uriii");
exports.rabbitMQConfig = {
    uri: process.env.RABBITMQ_URI || "amqp://localhost",
    queueName1: "project.team.creation",
    queueName2: "project.teamId.updation",
    queueName3: "project.getProject",
};
