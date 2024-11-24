import { Server, ServerCredentials } from "@grpc/grpc-js";

import { UserServiceServer ,UserServiceService} from "morrow-common/dist/grpc/user";

export class GrpcServer {
  private readonly server: Server;
  constructor(private readonly userService: UserServiceServer) {
    this.server = new Server();
    this.userService = userService;
    this.start();
  }
  start(): void {
    this.server.addService(UserServiceService, {
      getTeamIds: this.userService.getTeamIds.bind(this.userService),
    });
    this.server.bindAsync(
      "localhost:8080",
      ServerCredentials.createInsecure(),
      () => {
        console.log("Grpc server running at http://localhost:8080");
        this.server.start();
      }
    );
  }
}
