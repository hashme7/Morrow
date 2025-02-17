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
      try {
        const { userId } = call.request;
        console.log(`
          ***************************************************************

 

          userId:${userId};

          ${typeof userId} ${typeof new ObjectId(userId)}





          ****************************************************************

          `);
        // const teamIds = await repository.getTeamIdsByUserId(new ObjectId(userId));
        // const response: TeamResponse = { teamIds };
        callback(null, {teamIds:[]});
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
