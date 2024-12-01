import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { ProjectRequest, ProjectResponse, ProjectServiceService } from "morrow-common/dist/grpc/cmn";
import { IRepository } from "../../interfaces/repository.interface";

export class ProjectService implements ProjectServiceService{
    [method:string]:handleUnaryCall<any,any>;
    getProjectDetails:handleUnaryCall<ProjectRequest, ProjectResponse>;
    constructor(repository:IRepository){
        this.getProjectDetails = async(call:ServerUnaryCall<ProjectRequest,ProjectResponse>,callback:sendUnaryData<ProjectResponse>):Promise<void>{
            try {
                const {teamId} = call.request;
                const projectDetails = await repository.getProjectByTeamId(teamId);
                projectDetails.id.toString();
                console.log()
                callback(null,projectDetails);
            } catch (error) {
                console.error("Error in getProjectDetails:", error);
        callback(
          {
            code: 13,
            message: "Unknown error occurred",
          },
          null
        );
            }
        }
    }
}