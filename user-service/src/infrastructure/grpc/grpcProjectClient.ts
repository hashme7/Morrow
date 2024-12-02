import { ProjectRequest, ProjectsResponse, ProjectServiceClient } from "morrow-common/dist/grpc/cmn.d";
import { credentials,  ServiceError } from "@grpc/grpc-js";
import { IGrpcProjectClient } from "../../interfaces/grpc";

export class GrpcProjectClient implements IGrpcProjectClient{
  public client: ProjectServiceClient;
  constructor() {
    this.client = new ProjectServiceClient(
      "localhost:7070",
      credentials.createInsecure()
    );
    console.log(`grpc client for project server is running`);
  }
  async getProjectByTeamId(teamIds:string[]):Promise<ProjectsResponse>{
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
