import { credentials,ServiceError } from '@grpc/grpc-js';
import { UserServiceClient, UserRequest, TeamResponse } from "morrow-common/dist/grpc/user";

export class GrpcClient {
  private client: UserServiceClient;
  constructor() {
    this.client = new UserServiceClient(
      "localhost:8080",
      credentials.createInsecure()
    );
    console.log('grpc client is running....')
  }
  async getTeamIds(userId: string): Promise<TeamResponse | undefined> {
    const userRequest: UserRequest = { userId };
    return new Promise((resolve, reject) => {
      this.client.getTeamIds(userRequest, (err: ServiceError | null, response: TeamResponse) => {
        if (err) {
          console.error("Error in getTeamIds:", err);
          return reject(err);
        }
        console.log("Response:", response);
        resolve(response);
      });
    });
  }
}
