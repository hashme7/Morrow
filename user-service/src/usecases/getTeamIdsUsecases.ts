import { IRepository } from '../interfaces/repository.interface';
import { response } from '../interfaces/types/response';

export class GetTeamIdsUseCase {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  } 

  async execute(userId: string): Promise<response> {
    try {
      const teamIds = await this.repository.getTeamIdsByUserId(userId);
      return  { status: 200, message: "data fetched.", data: teamIds };
    } catch (error) {
      console.error(`Failed to get team IDs for user ${userId}:`, error);
      throw new Error("Unable to retrieve team IDs at this time.");
    }
  }
}