import { CreateStatus } from './../usecases/createStatus';
import { TaskController } from "../adaptors/task/controller";
import { TaskRepository } from "../infrastructure/repository/taskRepository";
import { CreateTask } from "../usecases/createTask";
import { DeleteTask } from "../usecases/deleteTask";
import { StatusRepository } from '../infrastructure/repository/statusRepository';
import { StatusController } from '../adaptors/status/controller';
import { GetStatus } from '../usecases/getStatus';
import { UpdateStatus } from '../usecases/updateStatus';
import { DeleteStatus } from '../usecases/deleteStatus';



const taskRepository = new TaskRepository();
const statusRepository = new StatusRepository();

const createTaskInstance = new CreateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository)
const createStatus = new CreateStatus(statusRepository);
const getStatus = new GetStatus(statusRepository);
const updateStatus = new UpdateStatus(statusRepository);
const deleteStatus = new DeleteStatus(statusRepository)


export const taskController = new TaskController(createTaskInstance,deleteTask)
export const statusController = new StatusController(createStatus,getStatus,updateStatus,deleteStatus);