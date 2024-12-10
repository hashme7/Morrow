import { ICreateRequest } from "../interfaces/usecases.interface/index.js";
import { IRepository } from "../interfaces/repository.interface";
import { Types } from "mongoose";

export class SendRequest implements ICreateRequest {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }
  async execute(projectId: number, userId: Types.ObjectId, note: string) {
    try {
      const teamId = await this.repository.getTeamIdByProject(projectId);
      if (!teamId) {
        return {
          status: 404,
          message: "no team id found with given project id",
        };
      }
      await this.repository.createRequest(teamId, userId, note);
      return { status: 201, message: "request send successfully" };
    } catch (error) {
      console.log(`Error on send Request : ${error}`);
      throw error;
    }
  }
}
