import mongoose from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { IAddMember } from "../interfaces/types/response";

export class AddTeamMembers{
    private readonly repository :IRepository;
    constructor(repository:IRepository){
        this.repository = repository
    }
    async execute(userId:mongoose.Types.ObjectId,teamId:mongoose.Types.ObjectId):Promise<IAddMember>{
        try {
            const insertedMember = await this.repository.addTeamMembers(userId,teamId);
            return insertedMember
        } catch (error) {
            console.log(`Error on addTeamMembers use cases : ${error}`);
            throw error;
        }
    }
}