import mongoose from "mongoose";
import { ITaskRepository } from "../../interfaces/taskRepository.interface";
export class DeleteTask {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }
  async execute(taskId: mongoose.Types.ObjectId) {
    try {
      await this.repository.deleteProject(taskId);
    } catch (error) {
      throw error;
    }
  }
}
