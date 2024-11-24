import { ITask } from "../entities_models/task";
import { ITaskRepository } from "../interfaces/taskRepository.interface";
import { ICreateTask } from "../interfaces/usecase.interface";

export class CreateTask implements ICreateTask {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(taskData: Omit<ITask, "createdAt" | "updatedAt">): Promise<ITask> {
      return await this.taskRepository.createTask(taskData);
    }
  }