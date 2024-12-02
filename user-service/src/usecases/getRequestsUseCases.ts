import { Types } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { IGrpcProjectClient } from "../interfaces/grpc";

export class GetRequests {
  constructor(private readonly repository: IRepository,private grpcProjectClient:IGrpcProjectClient) {
    this.repository = repository;
  }
  async execute(userId: Types.ObjectId) {
    try {
      const requests = await this.repository.getRequests(userId);
      const teamIds = requests.map((req)=>req.teamId.toString());
      const response =await this.grpcProjectClient.getProjectByTeamId(teamIds);
      // const combinedRequests =  response.projects.
      return { status: 200, message: "requests ",response };
    } catch (error) {
      console.log(`Error on GetRequests ${error} `);
      throw error;
    }
  }
}
