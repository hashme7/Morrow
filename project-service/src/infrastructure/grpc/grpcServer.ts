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
      (err, port) => {
        if (err) {
          console.error("Failed to bind gRPC server:", err);
          return;
        }
        console.log(`gRPC server is running at project service on port: ${port}`);

        this.server.start();
      }
    );
  }
}
