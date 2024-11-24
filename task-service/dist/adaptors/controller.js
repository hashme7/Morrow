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
class TaskController {
    constructor(createTaskUseCase, deleteTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskData = req.body;
                const newTask = yield this.createTaskUseCase.execute(taskData);
                res.status(201).json(newTask);
            }
            catch (error) {
                console.error(`Error creating task: ${error}`);
                res.status(500).json({ message: "Internal server error" });
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
