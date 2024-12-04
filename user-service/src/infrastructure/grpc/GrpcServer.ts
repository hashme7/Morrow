import { UserServiceServer, UserServiceService } from "morrow-common/dist/types";
import { Server,ServerCredentials } from "@grpc/grpc-js";

export class GrpcServer {
  private readonly server: Server;

  constructor(private readonly userService: UserServiceServer) {
    this.server = new Server();
    this.start();
  }

  start(): void {
    this.server.addService(UserServiceService, this.userService );
    this.server.bindAsync(
      "localhost:8080",
      ServerCredentials.createInsecure(),
      () => {
        console.log("gRPC server is running at user service on port : 8080");
        this.server.start();
      }
    );
  }
}
