import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { IJoinProject } from "../interfaces/usecases.interface";
import { ObjectId } from "mongodb";

export class JoinProject implements IJoinProject {
  constructor(private repository: IRepository) {}
  async execute(
    userId: string,
    requestId: string,
    teamId: string
  ): Promise<response> {
    try {
      await this.repository.addTeamMembers(
        new ObjectId(userId),
        new ObjectId(teamId)
      );
      await this.repository.addRole(
        new ObjectId(userId),
        new ObjectId(teamId),
        "Developer"
      );
      await this.repository.deleteRequest(new ObjectId(requestId));
      return { status: 204, message: "successfully entered in a project" };
    } catch (error) {
      console.log(`error on join project :${(error as Error).message} `);
      throw error;
    }
  }
}
