import { VerifyOtp } from "./../usecases/verifyOtp";
import { Controller } from "../adaptors/controller";
import { Repository } from "../infrastructure/repositories";
import { signupUser } from "../usecases/signup";
import Nodemailer from "./nodemailer";
import { ReIssueOtp } from "../usecases/reIssueOtp";
import { LoginUser } from "../usecases/loginUser";
import { AuthenticateToken } from "../usecases/authenticateToken";
import { GoogleAuth } from "../usecases/googleAuth";
import { GithubAuth } from "../usecases/gitHubAuth";
import { Github } from "./github";
import { ForgotPassword } from "../usecases/forgotPassword";
import { ResetPassword } from "../usecases/resetPassword";

const nodemailerInstance = new Nodemailer();
const githubInstance = new Github();

const repositoryInstance = new Repository();

const signupInstance = new signupUser(repositoryInstance, nodemailerInstance);
const forgotPassword = new ForgotPassword(repositoryInstance, nodemailerInstance);
const resetPassword = new ResetPassword(repositoryInstance);
const verifyOtpInstance = new VerifyOtp(repositoryInstance);
const reIssueOtpInstance = new ReIssueOtp(repositoryInstance);
const loginUserInstance = new LoginUser(repositoryInstance);
const authenticateTokenInstance = new AuthenticateToken(repositoryInstance);
const googleAuthInstance = new GoogleAuth(repositoryInstance);
const githubAuthInstance = new GithubAuth(repositoryInstance,githubInstance);

export const controllerInstance = new Controller(
  signupInstance,
  verifyOtpInstance,
  reIssueOtpInstance,
  loginUserInstance,
  authenticateTokenInstance,
  googleAuthInstance,
  githubAuthInstance,
  forgotPassword,
  resetPassword,
);
