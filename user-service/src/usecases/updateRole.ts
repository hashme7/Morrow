import { Types } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { IUpdateRole } from "../interfaces/usecases.interface";

export class UpdateRole implements IUpdateRole{
    constructor(private repository: IRepository) { }
    async execute(userId: string, teamId:string,role:'Developer' | 'TeamLead' | 'ProjectManager') {
       try {
          const updatedRole =  await this.repository.changeRole(
            new Types.ObjectId(userId),
            new Types.ObjectId(teamId),
            role
          );
            return { status: 200, data: updatedRole ,message:"updated succesfully"};
       } catch (error) {
           console.log(`Error on udpate role usecases ${error}`);
           throw new Error(`Error on udpate role usecases ${error}`);
       } 
    }
}