import { ProjectRequest, ProjectsResponse } from "morrow-common/dist";
import { ProjectServiceClient } from "morrow-common/dist/grpc/cmn.js";
import { credentials,  ServiceError } from "@grpc/grpc-js";
import { IGrpcProjectClient } from "../../interfaces/grpc";
import dotenv from "dotenv";
import path from "path";  

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

console.log(process.env.GRPC_PROJECT_SERVICE_URI, "asdkf", process.env.PORT);

export class GrpcProjectClient implements IGrpcProjectClient{
  public client: ProjectServiceClient;
  constructor() {
    this.client = new ProjectServiceClient(
      process.env.GRPC_PROJECT_SERVER_URI ||
        "project-service-x86.morrow-name-space:7070",
      credentials.createInsecure()
    );
    console.log(
      `grpc client for project server is running`,
      process.env.GRPC_PROJECT_SERVICE_URI
    );
  }
  async getProjectByTeamId(teamIds: string[]): Promise<ProjectsResponse>{
    if (!teamIds || teamIds.length === 0) {
      throw new Error("teamIds must be a non-empty array");
    }
    const projectRequest:ProjectRequest = {teamIds};
    return new Promise((resolve,reject)=>{
        this.client.getProjectDetails(projectRequest,(err:ServiceError | null,response:ProjectsResponse)=>{
            if(err){
                console.log(`error on getProjectsbyTeamId ${err}`);
                return reject(err);
            }
            console.log("response",response);
            resolve(response);
        });
    });
  }
}
