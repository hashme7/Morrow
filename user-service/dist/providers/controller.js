"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllerInstance = void 0;
const authController_1 = __importDefault(require("../adaptors/authController"));
const repository_1 = __importDefault(require("../infrastructure/repositories/repository"));
const useCases_1 = __importDefault(require("../use-cases/useCases"));
const send_verification_mail_1 = __importDefault(require("./send-verification-mail"));
const jwt_1 = __importDefault(require("./jwt/jwt"));
const github_1 = require("./github/github");
const addToTeam_consumer_1 = require("../infrastructure/rabbitMQ/consumer/addToTeam.consumer");
//provider
const jwtInstance = new jwt_1.default();
const nodemailerInstance = new send_verification_mail_1.default();
const githubClient = new github_1.Github();
const repositoryInstance = new repository_1.default();
const useCasesInstance = new useCases_1.default(repositoryInstance, nodemailerInstance, jwtInstance, githubClient);
const addTeamConsumerInstance = new addToTeam_consumer_1.AddTeamConsumer(useCasesInstance);
exports.authControllerInstance = new authController_1.default(useCasesInstance);
