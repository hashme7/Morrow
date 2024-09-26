"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerInstance = void 0;
const controller_1 = require("../adaptors/controller");
const repository_1 = require("../infrastructure/repositories/repository");
const usecases_1 = require("../usecases/usecases");
const rabbitMQ_1 = require("../infrastructure/rabbitMQ/producer/rabbitMQ");
//providers
const rabbitMQInstance = new rabbitMQ_1.RabbitMQService();
const respositoryInstance = new repository_1.Repository();
const useCasesInstance = new usecases_1.UseCases(respositoryInstance, rabbitMQInstance);
exports.controllerInstance = new controller_1.Controller(useCasesInstance);
