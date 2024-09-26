import { Controller } from "../adaptors/controller";
import { Repository } from "../infrastructure/repositories/repository";
import { UseCases } from "../usecases/usecases";
import { RabbitMQService } from "../infrastructure/rabbitMQ/producer/rabbitMQ";

//providers
const rabbitMQInstance = new RabbitMQService();



const respositoryInstance = new Repository();

const useCasesInstance = new UseCases(respositoryInstance,rabbitMQInstance);

export const controllerInstance = new Controller(useCasesInstance);

