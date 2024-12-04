import {
  ProjectServiceServer,
  ProjectServiceService,
} from "morrow-common/dist/grpc/cmn";
import { Server, ServerCredentials } from "@grpc/grpc-js";

export class GrpcServer {
  private readonly server: Server;
  constructor(private readonly projectService: ProjectServiceServer) {
    this.server = new Server();
    this.start();
  }
  start(): void {
    this.server.addService(ProjectServiceService, this.projectService);
    this.server.bindAsync(
      "localhost:7070",
      ServerCredentials.createInsecure(),
      () => {
        console.log(`grpc server is running at project service on port : 7070`);
      }
    );
    this.server.start();
  }
}
