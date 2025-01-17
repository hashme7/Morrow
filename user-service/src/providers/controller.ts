import { RabbitMQService } from "./../infrastructure/rabbitMQ/index";
import UserAuthController from "../adaptors/controller";

import Repository from "../infrastructure/repositories/repository";

import { AddTeamConsumer } from "../infrastructure/rabbitMQ/consumer/addTeamConsumer";
import { CreateTeam } from "../usecases/createTeamUseCases";
import { GetUser } from "../usecases/getUserUsecases";
import { ChangePassword } from "../usecases/changePasswordUsecases";
import { ChangeEmail } from "../usecases/changeEmail";
import {  UserService } from "../infrastructure/grpc/userService";
import { GrpcServer } from "../infrastructure/grpc/GrpcServer";
import { GetTeamMembers } from "../usecases/getTeamMembersUsecases";
import { GetAllUsers } from "../usecases/getAllUsersUseCases";
import { UpdateImage } from "../usecases/updateImgUseCases";
import { Cloudinary } from "../providers/cloudinary";
import { SendRequest } from "../usecases/sendRequestUsecases";
import { UpdateProfile } from "../usecases/updateProfileCases";
import { GrpcProjectClient } from "../infrastructure/grpc/grpcProjectClient";
import { GetRequests } from "../usecases/getRequestsUseCases";
import { JoinProject } from "../usecases/joinProject";
import { RejectRequest } from "../usecases/rejectRequest";
import { UpdateRole } from "../usecases/updateRole";


const repositoryInstance = new Repository();

//rpc
const userRpcInstance = new UserService(repositoryInstance);
new GrpcServer(userRpcInstance);
const projectRpcClient = new GrpcProjectClient();

//rabbitmq
const RabbitMQServiceInstance = new RabbitMQService();

const createTeamInstance = new CreateTeam(
  repositoryInstance,
  RabbitMQServiceInstance
);
const cloudinaryInstance = new Cloudinary();
const getUserInstance = new GetUser(repositoryInstance);
const changePasswordInstance = new ChangePassword(repositoryInstance);
const changeEmailInstance = new ChangeEmail(repositoryInstance);
const getTeamMembers = new GetTeamMembers(repositoryInstance);
const getAllUsers = new GetAllUsers(repositoryInstance);
const updateImg = new UpdateImage(repositoryInstance, cloudinaryInstance);
const sendRequest = new SendRequest(repositoryInstance);
const updateProfile = new UpdateProfile(repositoryInstance);
const getRequest = new GetRequests(repositoryInstance,projectRpcClient)
const joinProject = new JoinProject(repositoryInstance);
const rejectRequest = new RejectRequest(repositoryInstance);
const changeRole = new UpdateRole(repositoryInstance);

new AddTeamConsumer(createTeamInstance);

export const authControllerInstance = new UserAuthController(
  getUserInstance,
  changePasswordInstance,
  changeEmailInstance,
  getTeamMembers,
  updateImg,
  getAllUsers,
  sendRequest,
  updateProfile,
  getRequest,
  joinProject,
  rejectRequest,
  changeRole
);

