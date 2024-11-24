import { Types } from "mongoose";
import { ITask, Task } from "../../entities_models/task";
import { ITaskRepository } from "../../interfaces/taskRepository.interface";

export class TaskRepository implements ITaskRepository {
  async deleteProject(taskId: Types.ObjectId): Promise<void> {
    await Task.deleteOne({_id:taskId});
  }
  async createTask(task: ITask): Promise<ITask> {
    return await Task.create(task);
  }
}
