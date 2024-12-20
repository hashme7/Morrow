"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerInstance = void 0;
const verifyOtp_1 = require("./../usecases/verifyOtp");
const controller_1 = require("../adaptors/controller");
const repositories_1 = require("../infrastructure/repositories");
const signup_1 = require("../usecases/signup");
const nodemailer_1 = __importDefault(require("./nodemailer"));
const reIssueOtp_1 = require("../usecases/reIssueOtp");
const loginUser_1 = require("../usecases/loginUser");
const authenticateToken_1 = require("../usecases/authenticateToken");
const googleAuth_1 = require("../usecases/googleAuth");
const gitHubAuth_1 = require("../usecases/gitHubAuth");
const github_1 = require("./github");
const nodemailerInstance = new nodemailer_1.default();
const githubInstance = new github_1.Github();
const repositoryInstance = new repositories_1.Repository();
const signupInstance = new signup_1.signupUser(repositoryInstance, nodemailerInstance);
const verifyOtpInstance = new verifyOtp_1.VerifyOtp(repositoryInstance);
const reIssueOtpInstance = new reIssueOtp_1.ReIssueOtp(repositoryInstance);
const loginUserInstance = new loginUser_1.LoginUser(repositoryInstance);
const authenticateTokenInstance = new authenticateToken_1.AuthenticateToken(repositoryInstance);
const googleAuthInstance = new googleAuth_1.GoogleAuth(repositoryInstance);
const githubAuthInstance = new gitHubAuth_1.GithubAuth(repositoryInstance, githubInstance);
exports.controllerInstance = new controller_1.Controller(signupInstance, verifyOtpInstance, reIssueOtpInstance, loginUserInstance, authenticateTokenInstance, googleAuthInstance, githubAuthInstance);
