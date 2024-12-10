import { Types } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { IGrpcProjectClient } from "../interfaces/grpc";
// import { IFinalRequests } from "../interfaces/types/response";

export class GetRequests {
  constructor(
    private readonly repository: IRepository,
    private grpcProjectClient: IGrpcProjectClient
  ) {
    this.repository = repository;
  }
  async execute(userId: Types.ObjectId) {
    try {
      const requests = await this.repository.getRequests(userId);
      const teamIds = requests.map((req) => req.team_id.toString());
      const { projects } = await this.grpcProjectClient.getProjectByTeamId(
        teamIds
      );
      let requestHash = new Map();
      for (let req of requests) {
        requestHash.set(req.team_id.toString(),{ note:req.note,team_id:req.team_id,_id:req._id});
      }
      const combinedRequests = projects.map((project) => ({
        ...project,
        _id:String(requestHash.get(project.teamId)._id),
        team_id:String(requestHash.get(project.teamId).team_id),
        note: String(requestHash.get(project.teamId).note),
        projectStartDate: project.projectStartDate ?? null,
        projectEndDate: project.projectEndDate ?? null,
      }));
      return { status: 200, message: "requests ", data: combinedRequests };
    } catch (error) {
      console.error(`Error fetching requests: ${error}`);
      throw new Error("Failed to retrieve requests");
    }
  }
}
