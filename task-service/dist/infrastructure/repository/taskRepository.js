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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_1 = require("../../entities_models/task");
class TaskRepository {
    getTasks(team_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield task_1.Task.find({ teamId: team_id }).populate({
                    path: "status",
                    select: "id -_id",
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTaskStatus(taskId, teamId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield yield task_1.Task.findOneAndUpdate({
                    teamId: teamId,
                    _id: taskId,
                }, { $set: { status: new mongoose_1.default.Types.ObjectId(status) } }, { new: true }).lean();
            }
            catch (error) {
                console.log("error on update task Satsj", error);
                throw new Error("entllooo");
            }
        });
    }
    deleteTasksOnColumn(team_id, id) {
        throw new Error("Method not implemented.");
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("fajsdkfjas;", task);
                const newTask = new task_1.Task(task);
                return (yield newTask.save()).toObject();
            }
            catch (error) {
                console.log(`error on createTask repository.....`, error);
                throw error;
            }
        });
    }
    deleteProject(taskId) {
        throw new Error("Method not implemented.");
    }
}
exports.TaskRepository = TaskRepository;
