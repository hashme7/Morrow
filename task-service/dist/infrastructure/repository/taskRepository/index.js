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
exports.TaskRepository = void 0;
const task_1 = require("../../../entities_models/task");
class TaskRepository {
    deleteProject(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield task_1.Task.deleteOne({ _id: taskId });
            }
            catch (error) {
                console.log(`Error on deleteProject ${error}`);
                throw error;
            }
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield task_1.Task.create(task);
            }
            catch (error) {
                console.log(`Error on creating task ${error}`);
                throw error;
            }
        });
    }
}
exports.TaskRepository = TaskRepository;
