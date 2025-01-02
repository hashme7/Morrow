import { ConsumeMessage } from "amqplib";
import { IRepository } from "../interfaces/repository.interface";
import { rabbitMQConfig } from "../infrastructure/rabbitMQ/config/rabbitMQConfig";

export class CreateTeam {
  private readonly repository: IRepository;
  private readonly rabbitMQ : any;
  constructor(repository: IRepository,rabbitMQ:any) {
    this.repository = repository;
    this.rabbitMQ = rabbitMQ;
  }
  async execute(message: ConsumeMessage) {
    const response = JSON.parse(message.content.toString());
    const newTeam = await this.repository.createTeam(response);
    if(newTeam){
      await this.repository.addTeamMembers(response.userId, newTeam._id)
      await this.repository.addRole(
        response.userId,
        newTeam._id,
        "ProjectManager"
      );
      await this.rabbitMQ.publish(rabbitMQConfig.queueName2,{
        projectId:newTeam.projectId,
        teamId:newTeam._id.toString().trim(),
      });
    }else{
      throw new Error("error creating team and team Members");
    }
  }
}
