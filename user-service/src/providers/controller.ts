import UserAuthController from '../adaptors/authController';

import Repository from '../infrastructure/repositories/repository';

import UseCases from '../use-cases/useCases';
import Nodemailer from './send-verification-mail';
import JsonWebtoken from './jwt/jwt';
import { Github } from './github/github';
import { AddTeamConsumer } from '../infrastructure/rabbitMQ/consumer/addToTeam.consumer';


//provider
const jwtInstance = new JsonWebtoken();
const nodemailerInstance = new Nodemailer();
const githubClient = new Github();



const repositoryInstance = new Repository();

const useCasesInstance = new UseCases(repositoryInstance,nodemailerInstance,jwtInstance,githubClient);

const addTeamConsumerInstance = new AddTeamConsumer(useCasesInstance);

export const authControllerInstance = new UserAuthController(useCasesInstance); 