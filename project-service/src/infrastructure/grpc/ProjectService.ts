import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import {
  ProjectResponse,
  ProjectRequest,
  ProjectServiceServer,
} from "morrow-common/dist/grpc/cmn";
import { IRepository } from "../../interfaces/repository.interface";

export class ProjectService implements ProjectServiceServer {
  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
  getProjectDetails!: handleUnaryCall<ProjectRequest, ProjectResponse>;
  constructor(repository: IRepository) {
    this.getProjectDetails = async (
      call: ServerUnaryCall<ProjectRequest, ProjectResponse>,
      callback: sendUnaryData<ProjectResponse>
    ): Promise<void> => {
      try {
        const { teamId } = call.request;
        const response: ProjectResponse = await repository.getProjectByTeamId(
          teamId
        );
        callback(null, response);
      } catch (error) {
        console.log(`Error in getProjectDetails : ${error}`);
        callback({ code: 13, message: "unkown error occured." }, null);
      }
    };
    this["getProjectDetails"] = this.getProjectDetails;
  }
}
