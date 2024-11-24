import { RabbitMQService } from "./../infrastructure/rabbitMQ/index";
import UserAuthController from "../adaptors/authController";

import Repository from "../infrastructure/repositories/repository";

import Nodemailer from "./send-verification-mail";
import { Signup } from "../usecases/signupUsecase";
import { Github } from "./github/github";
import { AddTeamConsumer } from "../infrastructure/rabbitMQ/consumer/addTeamConsumer";
import { VerifyOtp } from "../usecases/verifyOtpUsecase";
import { Login } from "../usecases/loginUseCases";
import { ResendOtp } from "../usecases/resendOtpUseCases";
import { GoogleLogin } from "../usecases/googleLoginUsecases";
import { gitHubLogin } from "../usecases/githubLoginUseCases";
import { ValidateToken } from "../usecases/validateTokenUseCases";
import { CreateTeam } from "../usecases/createTeamUseCases";
import { GetUser } from "../usecases/getUserUsecases";
import { ChangePassword } from "../usecases/changePasswordUsecases";
import { ChangeEmail } from "../usecases/changeEmail";
import { ProjectRpcServer } from "../infrastructure/grpc/projectService";
import { GrpcServer } from "../infrastructure/grpc/GrpcServer";
import { GetTeamMembers } from "../usecases/getTeamMembersUsecases";
import { GetAllUsers } from "../usecases/getAllUsersUseCases";
import { UpdateImage } from "../usecases/updateImgUseCases";
import {Cloudinary} from '../providers/cloudinary'
import { SendRequest } from "../usecases/sendRequestUsecases";
import { UpdateProfile } from "../usecases/updateProfileCases";

//provider
const nodemailerInstance = new Nodemailer();
const githubClient = new Github();

const RabbitMQServiceInstance = new RabbitMQService();

const repositoryInstance = new Repository();

//rpc
const projectRpcInstance = new ProjectRpcServer(repositoryInstance);

new GrpcServer(projectRpcInstance);

const SignupInstance = new Signup(repositoryInstance, nodemailerInstance);
const VerifyOtpInstance = new VerifyOtp(repositoryInstance);
const resendOtpInstance = new ResendOtp(repositoryInstance);
const loginInstance = new Login(repositoryInstance);
const googleLoginInstance = new GoogleLogin(repositoryInstance);
const githubLoginInstance = new gitHubLogin(repositoryInstance, githubClient);
const validateTokenInstance = new ValidateToken();
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
const updateImg = new UpdateImage(repositoryInstance,cloudinaryInstance)
const sendRequest = new SendRequest(repositoryInstance);
const updateProfile = new UpdateProfile(repositoryInstance);
// const getRequest = new GetRequest(repositoryInstance)

new AddTeamConsumer(createTeamInstance);

export const authControllerInstance = new UserAuthController(
  SignupInstance,
  VerifyOtpInstance,
  resendOtpInstance,
  loginInstance,
  googleLoginInstance,
  githubLoginInstance,
  validateTokenInstance,
  getUserInstance,
  changePasswordInstance,
  changeEmailInstance,
  getTeamMembers,
  updateImg,
  getAllUsers,
  sendRequest,
  updateProfile
);
