import { UpdateTeamConsumer } from './../infrastructure/rabbitMQ/consumer/updateTeamConsumer';
import { Controller } from "../adaptors/controller";
import { Repository } from "../infrastructure/repositories/repository";
import { RabbitMQService } from "../infrastructure/rabbitMQ";
import { CreateProject } from "../usecases/createProjectUsecase";
import { UpdateTeamId } from "../usecases/updateTeamIdUsecases";
import { getProjectsByUserId } from '../usecases/getProjectUseCases';
import { GrpcClient } from '../infrastructure/grpc/grpcClient';

//providers
const rabbitMQInstance = new RabbitMQService();

const repositoryInstance = new Repository();

//grpc
const grpcClientInstance = new GrpcClient();

const updateTeamIdInstace = new UpdateTeamId(repositoryInstance);

new  UpdateTeamConsumer(updateTeamIdInstace);

const getProjectsByUserIdInstance = new getProjectsByUserId(repositoryInstance,grpcClientInstance);
const createProjectInstance = new CreateProject(repositoryInstance,rabbitMQInstance,updateTeamIdInstace);

export const controllerInstance = new Controller(createProjectInstance,getProjectsByUserIdInstance);

