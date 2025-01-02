"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagramController = exports.statusController = exports.taskController = void 0;
const createStatus_1 = require("./../usecases/task/createStatus");
const controller_1 = require("../adaptors/task/controller");
const taskRepository_1 = require("../infrastructure/repository/taskRepository");
const createTask_1 = require("../usecases/task/createTask");
const deleteTask_1 = require("../usecases/task/deleteTask");
const statusRepository_1 = require("../infrastructure/repository/statusRepository");
const controller_2 = require("../adaptors/status/controller");
const getStatus_1 = require("../usecases/task/getStatus");
const updateStatus_1 = require("../usecases/task/updateStatus");
const deleteStatus_1 = require("../usecases/task/deleteStatus");
const fetchTask_1 = require("../usecases/task/fetchTask");
const changeTaskStatus_1 = require("../usecases/task/changeTaskStatus");
const diagramRepository_1 = require("../infrastructure/repository/diagramRepository");
const controller_3 = require("../adaptors/diagram/controller");
const saveDiagram_1 = require("../usecases/diagram/saveDiagram");
const taskRepository = new taskRepository_1.TaskRepository();
const statusRepository = new statusRepository_1.StatusRepository();
const dbRepository = new diagramRepository_1.DiagramRepository();
//usecases
// (TASK-USECASES) //
const createTaskInstance = new createTask_1.CreateTask(taskRepository);
const deleteTask = new deleteTask_1.DeleteTask(taskRepository);
const getTask = new fetchTask_1.FetchTask(taskRepository);
const updateTaskStatus = new changeTaskStatus_1.ChangeTaskStatus(taskRepository);
// (STATUS-USECASES) //
const createStatus = new createStatus_1.CreateStatus(statusRepository);
const getStatus = new getStatus_1.GetStatus(statusRepository);
const updateStatus = new updateStatus_1.UpdateStatus(statusRepository);
const deleteStatus = new deleteStatus_1.DeleteStatus(statusRepository);
// (DIAGRAM-USECASES) //
const saveDiagram = new saveDiagram_1.SaveDiagram(dbRepository);
// (RABBIT-MQ) CONSUMER//
// (TASK-CONTROLLER) //
exports.taskController = new controller_1.TaskController(createTaskInstance, deleteTask, getTask, updateTaskStatus);
// (STATUS-CONTROLLER) //
exports.statusController = new controller_2.StatusController(createStatus, getStatus, updateStatus, deleteStatus);
// (DIAGRAM-CONTROLLER) //
exports.diagramController = new controller_3.DiagramController(saveDiagram);
