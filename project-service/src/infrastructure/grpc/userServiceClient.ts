import { credentials,ServiceError } from '@grpc/grpc-js';
import { UserServiceClient, UserRequest, TeamResponse } from "morrow-common/dist/grpc/cmn.js";

import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export class GrpcClient {
  private client: UserServiceClient;
  constructor() {
    this.client = new UserServiceClient(
      process.env.GRPC_USER_SERVICE_URI || "localhost:8080",
      credentials.createInsecure()
    );
    console.log(
      "grpc client is running....",
      process.env.GRPC_USER_SERVICE_URI
    );
  }
  async getTeamIds(userId: string): Promise<TeamResponse | undefined> {
    const userRequest: UserRequest = { userId };
    console.log("1",userId,userRequest,"userid and userRequest")
    return new Promise((resolve, reject) => {
      this.client.getTeamIds(userRequest, (err: ServiceError | null, response: TeamResponse) => {
        if (err) {
          console.error("Error in getTeamIds:", err);
          return reject(err);
        }
        resolve(response);
      });
    });
  }
}
