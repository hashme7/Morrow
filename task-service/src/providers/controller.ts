import { CreateStatus } from "./../usecases/task/createStatus";
import { TaskController } from "../adaptors/task/controller";
import { TaskRepository } from "../infrastructure/repository/taskRepository";
import { CreateTask } from "../usecases/task/createTask";
import { DeleteTask } from "../usecases/task/deleteTask";
import { StatusRepository } from "../infrastructure/repository/statusRepository";
import { StatusController } from "../adaptors/status/controller";
import { GetStatus } from "../usecases/task/getStatus";
import { UpdateStatus } from "../usecases/task/updateStatus";
import { DeleteStatus } from "../usecases/task/deleteStatus";
import { FetchTask } from "../usecases/task/fetchTask";
import { ChangeTaskStatus } from "../usecases/task/changeTaskStatus";
import { DiagramRepository } from "../infrastructure/repository/diagramRepository";
import { DiagramController } from "../adaptors/diagram/controller";
import { SaveDiagram } from "../usecases/diagram/saveDiagram";
import { FetchDiagram } from "../usecases/diagram/fetchDiagram";
import { ApiController } from "../adaptors/apitool/controller";
import { SendRequest } from "../usecases/apitool/sendRequest";
import { UploadApi } from "../usecases/apitool/uploadApi";
import { ApiRepository } from "../infrastructure/repository/apitoolRepository";
import { CheckApi } from "../usecases/apitool/apiCheckDB";
import { FetchApis } from "../usecases/apitool/fetchApis";
// REPOSITORY //
const taskRepository = new TaskRepository();
const statusRepository = new StatusRepository();
const dbRepository = new DiagramRepository();
const apiRepository = new ApiRepository();

//usecases
// (TASK-USECASES) //
const createTaskInstance = new CreateTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);
const getTask = new FetchTask(taskRepository);
const updateTaskStatus = new ChangeTaskStatus(taskRepository);

// (STATUS-USECASES) //
const createStatus = new CreateStatus(statusRepository);
const getStatus = new GetStatus(statusRepository);
const updateStatus = new UpdateStatus(statusRepository);
const deleteStatus = new DeleteStatus(statusRepository);

// (DIAGRAM-USECASES) //
const saveDiagram = new SaveDiagram(dbRepository);
const getDiagram = new FetchDiagram(dbRepository);

// (API-USECASES) //
const sendApi = new SendRequest();
const uploadApi = new UploadApi(apiRepository);
const checkApi = new CheckApi(apiRepository);
const getApi = new FetchApis(apiRepository);


// (RABBIT-MQ) CONSUMER//


// (TASK-CONTROLLER) //
export const taskController = new TaskController(
  createTaskInstance,
  deleteTask,
  getTask,
  updateTaskStatus
);

// (STATUS-CONTROLLER) //
export const statusController = new StatusController(
  createStatus,
  getStatus,
  updateStatus,
  deleteStatus
);

// (DIAGRAM-CONTROLLER) //
export const diagramController = new DiagramController(saveDiagram, getDiagram);

// (APITOOL-CONTROLLER) //
export const apiController = new ApiController(sendApi,checkApi,uploadApi,getApi);