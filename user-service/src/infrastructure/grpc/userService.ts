import { UserRequest, TeamResponse } from "morrow-common";
import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { IRepository } from "../../interfaces/repository.interface";
import { UserServiceServer } from "morrow-common";

// Implementation of the UserServiceServer interface
export class UserService implements UserServiceServer {
  [method: string]: handleUnaryCall<any, any>

  getTeamIds: handleUnaryCall<UserRequest, TeamResponse>;

  constructor(repository: IRepository) {
    this.getTeamIds = async (
      call: ServerUnaryCall<UserRequest, TeamResponse>,
      callback: sendUnaryData<TeamResponse>
    ): Promise<void> => {
      try {
        const { userId } = call.request;
        const teamIds = await repository.getTeamIdsByUserId(userId);
        const response: TeamResponse = { teamIds };
        callback(null, response);
      } catch (error) {
        console.error("Error in getTeamIds:", error);
        callback(
          {
            code: 13,
            message: "Unknown error occurred",
          },
          null
        );
      }
    };

    this["getTeamIds"] = this.getTeamIds;
  }
}
