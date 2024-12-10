import { TaskController } from "../adaptors/task/controller";
import { TaskRepository } from "../infrastructure/repository/taskRepository";
import { CreateTask } from "../usecases/createTask";
import { DeleteTask } from "../usecases/deleteTask";



const taskRepositoryInstance = new TaskRepository();

const createTaskInstance = new CreateTask(taskRepositoryInstance);
const deleteTask = new DeleteTask(taskRepositoryInstance)


export const taskController = new TaskController(createTaskInstance,deleteTask)