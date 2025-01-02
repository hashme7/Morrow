import mongoose from "mongoose";
import { ITask } from "../../interfaces/response.interface";
import { ITaskRepository } from "../../interfaces/taskRepository.interface";
import { ICahngeTaskStatus } from "../../interfaces/usecase.interface";

export class ChangeTaskStatus implements ICahngeTaskStatus{
    constructor(private repository: ITaskRepository) { };
    async execute(id: string, teamId: string, status: string): Promise<ITask | undefined> {
        try {
            return await this.repository.updateTaskStatus(
              new mongoose.Types.ObjectId(id),
              new mongoose.Types.ObjectId(teamId),
              status
            );
        } catch (error) {
            throw error;
        }
    }

}