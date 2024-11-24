import { IRepository } from "../interfaces/repository.interface";

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
      const paginatedMembers = await this.repository.findUsersByIds(
        teamMembersId,
        offset,
        limit
      );

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
