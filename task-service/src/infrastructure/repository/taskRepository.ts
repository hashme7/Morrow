import { Types } from 'mongoose';
import { IReqTask, ITask } from '../../interfaces/response.interface';
import { ITaskRepository } from './../../interfaces/taskRepository.interface/index';
export class TaskRepository implements ITaskRepository{
    deleteTasksOnColumn(team_id: Types.ObjectId, id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    createTask(task:IReqTask): Promise<ITask> {
        throw new Error('Method not implemented.');
    }
    deleteProject(taskId: Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }
}