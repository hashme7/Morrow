import { UserServiceClient } from "morrow-common";
import { IRepository } from "../interfaces/repository.interface";

export class getProjectsByUserId {
  constructor(
    private readonly repository: IRepository,
    private readonly grpcClient: UserServiceClient
  ) {
    this.repository = repository;
  }
  async execute(userId: string) {
    try {
      const {teamIds} = await this.grpcClient.getTeamIds({userId});
      const projects = await this.repository.getProjectsByTeamIds(
        teamIds
      );
      return { status: 200,message:"project retrieved successfylly", data: projects };
    } catch (error) {
      console.log(`Error on executing the getProjectByUserId: ${error}`);
      return { status: 500 };
    }
  }
}
