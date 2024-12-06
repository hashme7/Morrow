import { ConsumeMessage } from "amqplib";
import { IRepository } from "../interfaces/repository.interface";

export class UpdateTeamId{
    private readonly repository:IRepository;
    constructor(repository :IRepository){
        this.repository = repository;
    }
    async execute(message:ConsumeMessage){
        try {
            const response = JSON.parse(message.content.toString());
            console.log(response.projectId,response.teamId,"fajskdfjkajsdfkajsdkfjaksjdf=+++++++++++++++++++++++++++++++++++++++++")
            await this.repository.updateTeamId(response.projectId,response.teamId);
            return {status:200,message:"teamid updated succefuly on project"};
        } catch (error) {
            console.log(`Error on update the team id in project : ${error}`);
            throw error;
        }
    }   
}