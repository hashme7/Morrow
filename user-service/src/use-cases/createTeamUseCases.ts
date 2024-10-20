import { ConsumeMessage } from "amqplib";
import { IRepository } from "../interfaces/repository.interface";

export class CreateTeam {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }
  async execute(message: ConsumeMessage) {
    const response = JSON.parse(message.content.toString());
    await this.repository.createTeam(response);
  }
}
