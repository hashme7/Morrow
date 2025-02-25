import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import {
  ProjectsResponse,
  ProjectRequest,
  ProjectServiceServer,
} from "morrow-common/dist/grpc/cmn";
import { IRepository } from "../../interfaces/repository.interface";

export class ProjectService implements ProjectServiceServer {
  [name: string]: handleUnaryCall<ProjectRequest,ProjectsResponse>;   
  getProjectDetails!: handleUnaryCall<ProjectRequest, ProjectsResponse>;
  constructor(repository: IRepository) {
    this.getProjectDetails = async (
      call: ServerUnaryCall<ProjectRequest, ProjectsResponse>,
      callback: sendUnaryData<ProjectsResponse>
    ): Promise<void> => {
      try {
        const { teamIds } = call.request;
        console.log(teamIds,"teamIds")
        const projects = (await repository.getProjectsByTeamIds(
          teamIds
        )).map((project) => ({
          ...project,
          teamId: project.teamId || "",
          projectStartDate:project.plannedStartDate || "",
          projectEndDate:project.projectEndDate || undefined,
        }));
        
        callback(null, {projects});
      } catch (error) {
        console.log(`Error in getProjectDetails : ${error}`);
        callback({ code: 13, message: "unkown error occured." }, null);
      } 
    };
    this["getProjectDetails"] = this.getProjectDetails;   
  }
}
