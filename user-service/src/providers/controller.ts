import UserAuthController from "../adaptors/authController";

import Repository from "../infrastructure/repositories/repository";

import UseCases from "../use-cases/useCases";
import Nodemailer from "./send-verification-mail";
import { Signup } from "../use-cases/signupUsecase";
import JsonWebtoken from "./jwt/jwt";
import { Github } from "./github/github";
import { AddTeamConsumer } from "../infrastructure/rabbitMQ/consumer/addToTeam.consumer";
import { VerifyOtp } from "../use-cases/verifyOtpUsecase";
import { Login } from "../use-cases/loginUseCases";
import { ResendOtp } from "../use-cases/resendOtpUseCases";
import { updateFullName } from "../use-cases/updateFullNameUseCase";
import { GoogleLogin } from "../use-cases/googleLoginUsecases";
import { gitHubLogin } from "../use-cases/githubLoginUseCases";
import { ValidateToken } from "../use-cases/validateTokenUseCases";
import { CreateTeam } from "../use-cases/createTeamUseCases";

//provider
const jwtInstance = new JsonWebtoken();
const nodemailerInstance = new Nodemailer();
const githubClient = new Github();

const repositoryInstance = new Repository();

const SignupInstance = new Signup(repositoryInstance, nodemailerInstance);
const VerifyOtpInstance = new VerifyOtp(repositoryInstance);
const resendOtpInstance = new ResendOtp(repositoryInstance);
const loginInstance = new Login(repositoryInstance);
const updateNameInstance = new updateFullName(repositoryInstance);
const googleLoginInstance = new GoogleLogin(repositoryInstance);
const githubLoginInstance = new gitHubLogin(repositoryInstance, githubClient);
const validateTokenInstance = new ValidateToken();
const createTeamInstance = new CreateTeam(repositoryInstance);

const useCasesInstance = new UseCases(
  repositoryInstance,
  jwtInstance,
  githubClient
);
new AddTeamConsumer(createTeamInstance);

export const authControllerInstance = new UserAuthController(
  SignupInstance,
  VerifyOtpInstance,
  resendOtpInstance,
  loginInstance,
  updateNameInstance,
  googleLoginInstance,
  githubLoginInstance,
  validateTokenInstance
);
