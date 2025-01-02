import { ICreateRequest } from "../interfaces/usecases.interface/index.js";
import { IRepository } from "../interfaces/repository.interface";
import { Types } from "mongoose";
import { IRequest } from "../interfaces/types/user.js";

export class SendRequest implements ICreateRequest {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }
  async execute(projectId: number, userId: Types.ObjectId, note: string) :Promise<IRequest | null>{
    try {
      const teamId = await this.repository.getTeamIdByProject(projectId);
      if (!teamId) {
        return null
      }
      const newRequest = await this.repository.createRequest(teamId, userId, note);
      return newRequest;
    } catch (error) {
      console.log(`Error on send Request : ${error}`);
      throw error;
    }
  }
}
