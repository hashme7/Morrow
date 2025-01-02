import mongoose, { Types } from 'mongoose';
import { IReqTask, ITask} from '../../interfaces/response.interface';
import { ITaskRepository } from './../../interfaces/taskRepository.interface/index';
import { Task } from '../../entities_models/task';

export class TaskRepository implements ITaskRepository {
  async getTasks(team_id: Types.ObjectId): Promise<ITask[]> {
    try {
      return await Task.find({ teamId: team_id }).populate({
        path: "status",
        select: "id -_id",
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTaskStatus(
    taskId: Types.ObjectId,
    teamId: Types.ObjectId,
    status: string
  ): Promise<ITask | undefined> {
    try {
      return await (
        await Task.findOneAndUpdate(
          {
            teamId: teamId,
            _id: taskId,
          },
          { $set: { status: new mongoose.Types.ObjectId(status) } },{new:true}
        ).lean() as ITask
      );
    } catch (error) {
      console.log("error on update task Satsj",error)
      throw new Error("entllooo");
    }
  }

  deleteTasksOnColumn(team_id: Types.ObjectId, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createTask(task: IReqTask): Promise<ITask> {
    try {
      console.log("fajsdkfjas;", task);
      const newTask = new Task(task);
      return (await newTask.save()).toObject();
    } catch (error) {
      console.log(`error on createTask repository.....`, error);
      throw error;
    }
  }
  deleteProject(taskId: Types.ObjectId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}