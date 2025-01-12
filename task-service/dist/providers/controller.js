"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = exports.diagramController = exports.statusController = exports.taskController = void 0;
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
const fetchDiagram_1 = require("../usecases/diagram/fetchDiagram");
const controller_4 = require("../adaptors/apitool/controller");
const sendRequest_1 = require("../usecases/apitool/sendRequest");
const uploadApi_1 = require("../usecases/apitool/uploadApi");
const apitoolRepository_1 = require("../infrastructure/repository/apitoolRepository");
const apiCheckDB_1 = require("../usecases/apitool/apiCheckDB");
const fetchApis_1 = require("../usecases/apitool/fetchApis");
// REPOSITORY //
const taskRepository = new taskRepository_1.TaskRepository();
const statusRepository = new statusRepository_1.StatusRepository();
const dbRepository = new diagramRepository_1.DiagramRepository();
const apiRepository = new apitoolRepository_1.ApiRepository();
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
const getDiagram = new fetchDiagram_1.FetchDiagram(dbRepository);
// (API-USECASES) //
const sendApi = new sendRequest_1.SendRequest();
const uploadApi = new uploadApi_1.UploadApi(apiRepository);
const checkApi = new apiCheckDB_1.CheckApi(apiRepository);
const getApi = new fetchApis_1.FetchApis(apiRepository);
// (RABBIT-MQ) CONSUMER//
// (TASK-CONTROLLER) //
exports.taskController = new controller_1.TaskController(createTaskInstance, deleteTask, getTask, updateTaskStatus);
// (STATUS-CONTROLLER) //
exports.statusController = new controller_2.StatusController(createStatus, getStatus, updateStatus, deleteStatus);
// (DIAGRAM-CONTROLLER) //
exports.diagramController = new controller_3.DiagramController(saveDiagram, getDiagram);
// (APITOOL-CONTROLLER) //
exports.apiController = new controller_4.ApiController(sendApi, checkApi, uploadApi, getApi);
