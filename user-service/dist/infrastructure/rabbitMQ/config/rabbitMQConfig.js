"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQConfig = void 0;
exports.rabbitMQConfig = {
    uri: process.env.RABBITMQ_URI || "amqp://localhost",
    queueName1: "project.team.creation",
    queueName2: "project.teamId.updation",
};
