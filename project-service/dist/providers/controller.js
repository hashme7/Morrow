"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerInstance = void 0;
const updateTeamConsumer_1 = require("./../infrastructure/rabbitMQ/consumer/updateTeamConsumer");
const controller_1 = require("../adaptors/controller");
const repository_1 = require("../infrastructure/repositories/repository");
const rabbitMQ_1 = require("../infrastructure/rabbitMQ");
const createProjectUsecase_1 = require("../usecases/createProjectUsecase");
const updateTeamIdUsecases_1 = require("../usecases/updateTeamIdUsecases");
const getProjectUseCases_1 = require("../usecases/getProjectUseCases");
const userServiceClient_1 = require("../infrastructure/grpc/userServiceClient");
//providers
const rabbitMQInstance = new rabbitMQ_1.RabbitMQService();
const repositoryInstance = new repository_1.Repository();
//grpc
const grpcClientInstance = new userServiceClient_1.GrpcClient();
const updateTeamIdInstace = new updateTeamIdUsecases_1.UpdateTeamId(repositoryInstance);
new updateTeamConsumer_1.UpdateTeamConsumer(updateTeamIdInstace);
const getProjectsByUserIdInstance = new getProjectUseCases_1.getProjectsByUserId(repositoryInstance, grpcClientInstance);
const createProjectInstance = new createProjectUsecase_1.CreateProject(repositoryInstance, rabbitMQInstance, updateTeamIdInstace);
exports.controllerInstance = new controller_1.Controller(createProjectInstance, getProjectsByUserIdInstance);
