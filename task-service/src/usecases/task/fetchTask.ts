import { Types } from "mongoose";
import { ITask } from "../../interfaces/response.interface";
import { IFetchTask } from "../../interfaces/usecase.interface";
import { ITaskRepository } from "../../interfaces/taskRepository.interface";

export class FetchTask implements IFetchTask {
  constructor(private repository: ITaskRepository) {}
  async execute(team_id: Types.ObjectId): Promise<ITask[]> {
    try {
      return await this.repository.getTasks(team_id);
    } catch (error) {
      throw error;
    }
  }
}
