import { IReqTask, ITask } from "../interfaces/response.interface";
import { ITaskRepository } from "../interfaces/taskRepository.interface";
import { ICreateTask } from "../interfaces/usecase.interface";

export class CreateTask implements ICreateTask {
    constructor(private taskRepository: ITaskRepository) {}
  async execute(taskData: IReqTask): Promise<ITask> {
    try {
      return (await this.taskRepository.createTask(taskData));
    } catch (error) {
      throw error;
    }
  }
  }