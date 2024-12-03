import { Types } from "mongoose";
import { ITask} from "../../../interfaces/response.interface";
import { ITaskRepository } from "../../../interfaces/taskRepository.interface";
import { Task } from "../../../entities_models/task";

export class TaskRepository implements ITaskRepository {
  async deleteProject(taskId: Types.ObjectId): Promise<void> {
    try {
      await Task.deleteOne({_id:taskId});
    } catch (error) {
      console.log(`Error on deleteProject ${error}`);
      throw error;
    }
  }
  async createTask(task: ITask): Promise<ITask> {
    try {
      return await Task.create(task);
    } catch (error) {
      console.log(`Error on creating task ${error}`);
      throw error;
    }
  }
}
