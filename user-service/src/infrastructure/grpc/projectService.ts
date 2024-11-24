import { UserRequest, TeamResponse } from "morrow-common";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { IRepository } from "../../interfaces/repository.interface";
import { UserServiceServer } from "morrow-common";

export class ProjectRpcServer implements UserServiceServer {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }

  async getTeamIds(
    call: ServerUnaryCall<UserRequest, TeamResponse>,
    callback: sendUnaryData<TeamResponse>
  ): Promise<void> {
    const requestData = call.request;
    const teamIds = await this.repository.getTeamIdsByUserId(
      requestData.userId
    );
    const response:TeamResponse = {teamIds};
    callback(null, response);
  }
}
