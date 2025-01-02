import { IReqTask, ITask } from "../../interfaces/response.interface";
import { ITaskRepository } from "../../interfaces/taskRepository.interface";
import { ICreateTask } from "../../interfaces/usecase.interface";

export class CreateTask implements ICreateTask {
  constructor(private taskRepository: ITaskRepository) {}
  async execute(taskData: IReqTask): Promise<ITask> {
    try {
      console.log(taskData, "kfjakjsd");
      return await this.taskRepository.createTask(taskData);
    } catch (error) {
      console.log(`error on execute createTask :${error}`);
      throw error;
    }
  }
}
