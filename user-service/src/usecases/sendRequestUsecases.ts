import { ICreateRequest } from '../interfaces/use-case.interface';
import { IRepository } from "../interfaces/repository.interface";
import { Types } from 'mongoose';

export class SendRequest implements ICreateRequest{
    constructor(private readonly repository:IRepository){
        this.repository = repository;
    }
    async execute(projectId: number,userId: Types.ObjectId){
        try {
            const teamId=await this.repository.getTeamIdByProject(projectId);
            if(!teamId){
                return {status:404,message:'no team id found with given project id'}
            }
            await this.repository.createRequest(teamId,userId);
            return {status:201,message:'request send successfully'};
        } catch (error) {
            console.log(`Error on send Request : ${error}`);
            throw error;
        }
    }
}