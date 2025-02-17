import { UpdateTeamConsumer } from './../infrastructure/rabbitMQ/consumer/updateTeamConsumer';
import { Controller } from "../adaptors/controller";
import { Repository } from "../infrastructure/repositories/repository";
import { RabbitMQService } from "../infrastructure/rabbitMQ";
import { CreateProject } from "../usecases/createProjectUsecase";
import { UpdateTeamId } from "../usecases/updateTeamIdUsecases";
import { getProjectsByUserId } from '../usecases/getProjectUseCases';
import { GrpcClient } from '../infrastructure/grpc/userServiceClient';
import { GrpcServer } from '../infrastructure/grpc/grpcServer';
import { ProjectService } from '../infrastructure/grpc/ProjectService';

//providers
const rabbitMQInstance = new RabbitMQService();

const repositoryInstance = new Repository();
  

const projectRpcService = new ProjectService(repositoryInstance);

new GrpcServer(projectRpcService);

//grpc
const grpcClientInstance = new GrpcClient();

const updateTeamIdInstace = new UpdateTeamId(repositoryInstance);

new  UpdateTeamConsumer(updateTeamIdInstace);

const getProjectsByUserIdInstance = new getProjectsByUserId(repositoryInstance,grpcClientInstance);
const createProjectInstance = new CreateProject(repositoryInstance,rabbitMQInstance,updateTeamIdInstace);

export const controllerInstance = new Controller(createProjectInstance,getProjectsByUserIdInstance);

