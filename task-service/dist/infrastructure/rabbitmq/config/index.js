"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQConfig = void 0;
exports.rabbitMQConfig = {
    uri: process.env.RABBITMQ_URI || "amqp://localhost",
    addDiagram: "diagram.addDiagram",
};
