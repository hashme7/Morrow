import { Types } from 'mongoose';
import { ITask } from '../../interfaces/response.interface';
import { ITaskRepository } from './../../interfaces/taskRepository.interface/index';
export class TaskRepository implements ITaskRepository{
    createTask(task: Omit<ITask, 'createdAt' | 'updatedAt'>): Promise<ITask> {
        throw new Error('Method not implemented.');
    }
    deleteProject(taskId: Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }
}