"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllerInstance = void 0;
const index_1 = require("./../infrastructure/rabbitMQ/index");
const controller_1 = __importDefault(require("../adaptors/controller"));
const repository_1 = __importDefault(require("../infrastructure/repositories/repository"));
const addTeamConsumer_1 = require("../infrastructure/rabbitMQ/consumer/addTeamConsumer");
const createTeamUseCases_1 = require("../usecases/createTeamUseCases");
const getUserUsecases_1 = require("../usecases/getUserUsecases");
const changePasswordUsecases_1 = require("../usecases/changePasswordUsecases");
const changeEmail_1 = require("../usecases/changeEmail");
const userService_1 = require("../infrastructure/grpc/userService");
const GrpcServer_1 = require("../infrastructure/grpc/GrpcServer");
const getTeamMembersUsecases_1 = require("../usecases/getTeamMembersUsecases");
const getAllUsersUseCases_1 = require("../usecases/getAllUsersUseCases");
const updateImgUseCases_1 = require("../usecases/updateImgUseCases");
const cloudinary_1 = require("../providers/cloudinary");
const sendRequestUsecases_1 = require("../usecases/sendRequestUsecases");
const updateProfileCases_1 = require("../usecases/updateProfileCases");
const grpcProjectClient_1 = require("../infrastructure/grpc/grpcProjectClient");
const getRequestsUseCases_1 = require("../usecases/getRequestsUseCases");
const joinProject_1 = require("../usecases/joinProject");
const rejectRequest_1 = require("../usecases/rejectRequest");
const updateRole_1 = require("../usecases/updateRole");
const repositoryInstance = new repository_1.default();
//rpc
const userRpcInstance = new userService_1.UserService(repositoryInstance);
new GrpcServer_1.GrpcServer(userRpcInstance);
const projectRpcClient = new grpcProjectClient_1.GrpcProjectClient();
//rabbitmq
const RabbitMQServiceInstance = new index_1.RabbitMQService();
const createTeamInstance = new createTeamUseCases_1.CreateTeam(repositoryInstance, RabbitMQServiceInstance);
const cloudinaryInstance = new cloudinary_1.Cloudinary();
const getUserInstance = new getUserUsecases_1.GetUser(repositoryInstance);
const changePasswordInstance = new changePasswordUsecases_1.ChangePassword(repositoryInstance);
const changeEmailInstance = new changeEmail_1.ChangeEmail(repositoryInstance);
const getTeamMembers = new getTeamMembersUsecases_1.GetTeamMembers(repositoryInstance);
const getAllUsers = new getAllUsersUseCases_1.GetAllUsers(repositoryInstance);
const updateImg = new updateImgUseCases_1.UpdateImage(repositoryInstance, cloudinaryInstance);
const sendRequest = new sendRequestUsecases_1.SendRequest(repositoryInstance);
const updateProfile = new updateProfileCases_1.UpdateProfile(repositoryInstance);
const getRequest = new getRequestsUseCases_1.GetRequests(repositoryInstance, projectRpcClient);
const joinProject = new joinProject_1.JoinProject(repositoryInstance);
const rejectRequest = new rejectRequest_1.RejectRequest(repositoryInstance);
const changeRole = new updateRole_1.UpdateRole(repositoryInstance);
new addTeamConsumer_1.AddTeamConsumer(createTeamInstance);
exports.authControllerInstance = new controller_1.default(getUserInstance, changePasswordInstance, changeEmailInstance, getTeamMembers, updateImg, getAllUsers, sendRequest, updateProfile, getRequest, joinProject, rejectRequest, changeRole);
