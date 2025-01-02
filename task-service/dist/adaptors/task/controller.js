"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
class TaskController {
    constructor(createTaskUseCase, deleteTaskUseCase, fetchTask, changeTaskStatus) {
        this.createTaskUseCase = createTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.fetchTask = fetchTask;
        this.changeTaskStatus = changeTaskStatus;
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team_id = req.params.teamId;
                const status = req.query.status;
                const name = req.query.name;
                const priority = req.query.priority;
                const { assignee } = req.body;
                const typedAssignee = assignee.map((id) => {
                    return new mongoose_1.Types.ObjectId(id);
                });
                const newTask = yield this.createTaskUseCase.execute({
                    status: new mongoose_1.Types.ObjectId(status),
                    name,
                    priority,
                    teamId: new mongoose_1.Types.ObjectId(team_id),
                    assignee: typedAssignee,
                });
                console.log("fkd", newTask, "fkd");
                res.status(201).json(newTask);
            }
            catch (error) {
                console.error(`Error creating task: ${error}`);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { teamId } = req.params;
                console.log("task teamid", teamId);
                const tasks = yield this.fetchTask.execute(new mongodb_1.ObjectId(teamId));
                res.status(200).json(tasks);
            }
            catch (error) {
                console.log(`Error on get Task :${error}`);
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.query;
                const { team_id } = req.params;
                console.log("ad:LlllLLL::: ", id, status, team_id);
                const updatedTask = yield this.changeTaskStatus.execute(id, team_id, status);
                res.status(200).json(updatedTask);
            }
            catch (error) {
                console.log(`Error on update status Task :${error}`);
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.query;
                yield this.deleteTaskUseCase.execute(new mongodb_1.ObjectId(taskId));
                res.status(304).json({ message: "task delete succesfully" });
            }
            catch (error) {
                console.log(`error on deleting the task :${error}`);
                throw error;
            }
        });
    }
}
exports.TaskController = TaskController;
