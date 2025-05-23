import { UserServiceServer, UserServiceService } from "morrow-common/dist/grpc/cmn";
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
      "0.0.0.0:8080",
      ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          console.error("Server binding error:", error);
          return;
        }
        console.log(`gRPC server is running at user service on port: ${port}`);
        console.log(`gRPC server address: ${this.server}`);
      }
    );
  }
}
