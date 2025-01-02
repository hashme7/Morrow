import { IRepository } from "../interfaces/repository.interface";
import { IUser } from "../interfaces/types/user";

export class GetTeamMembers {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }

  async execute(projectId: string, page: number, limit: number) {
    try {
      const teamId = await this.repository.getTeamIdByProject(
        Number(projectId)
      );
      if (!teamId) throw new Error("team is not found..");
      const teamMembersId = await this.repository.getTeamMembers(teamId);
      const totalItems = teamMembersId.length;
      const offset = (page - 1) * limit;
      const members = await this.repository.findUsersByIds(
        teamMembersId,
        offset,
        limit
      );
      const roles = await this.repository.getRolesByTeamId(teamId);
      const hashRoles = new Map();
      for (let role of roles) {
        hashRoles.set(role.user_account.toString(),role.role);
      }
      const paginatedMembers = members.map((user: IUser) => {
        let role = hashRoles.get(user._id?.toString());
        return { ...user ,role:role };
      })
      return {
        status: 200,
        message: "Team members found",
        data: paginatedMembers,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      };
    } catch (error) {
      console.log(`Error on executing the get team member: ${error}`);
      throw error;
    }
  }
}
