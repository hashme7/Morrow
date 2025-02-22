import { UserRequest, TeamResponse } from "morrow-common/dist/grpc/cmn";
import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { IRepository } from "../../interfaces/repository.interface";
import { UserServiceServer } from "morrow-common/dist/grpc/cmn";
import { ObjectId } from "mongodb";

// Implementation of the UserServiceServer interface
export class UserService implements UserServiceServer {
  [name: string]:handleUnaryCall<any, any>;

  getTeamIds: handleUnaryCall<UserRequest, TeamResponse>;

  constructor(repository: IRepository) {
    this.getTeamIds = async (
      call: ServerUnaryCall<UserRequest, TeamResponse>,
      callback: sendUnaryData<TeamResponse>
    ): Promise<void> => {
      const { userId } = call.request;
      try {
        const teamIds = await repository.getTeamIdsByUserId(new ObjectId(userId));
        const response: TeamResponse = { teamIds };
        
        callback(null, response);
      } catch (error) {
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
