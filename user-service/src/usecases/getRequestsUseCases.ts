import { Types } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";

export class GetRequests {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }
  async execute(userId:Types.ObjectId){
    try {
        const data = await this.repository.getRequests(userId);
        return {status:200,message:"requests ",data}
    } catch (error) {
        console.log(`Error on GetRequests ${error} `);
        throw error
    }
  }
}
