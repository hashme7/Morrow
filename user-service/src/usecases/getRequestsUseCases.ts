import { Types } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { IGrpcProjectClient } from "../interfaces/grpc";
import { IProject } from "../interfaces/types/project";

export class GetRequests {
  constructor(private readonly repository: IRepository,private grpcProjectClient:IGrpcProjectClient) {
    this.repository = repository;
  }
  async execute(userId: Types.ObjectId) {
    try {
      const requests = await this.repository.getRequests(userId);
      const teamIds = requests.map((req)=>req.teamId.toString());
      const response =await this.grpcProjectClient.getProjectByTeamId(teamIds);
      let requestHash =new Map();
      for(let req of requests){
        requestHash.set(req.teamId,req.note);
      }
      const combinedRequests =  response.projects.map((project)=>({
        ...project,note:requestHash.get(project.teamId)
      }))
      return { status: 200, message: "requests ",data:combinedRequests };
    } catch (error) {
      console.log(`Error on GetRequests ${error} `);
      throw error;
    }
  }
}
