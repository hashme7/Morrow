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
exports.CreateProject = void 0;
class CreateProject {
    constructor(repository, rabbitMQ, updateProjectCases) {
        this.repository = repository;
        this.rabbitMQ = rabbitMQ;
        this.updateProjectCases = updateProjectCases;
    }
    execute(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield this.repository.create(data);
                const message = {
                    projectId: project.id,
                    projectName: project.name,
                    userId: userId,
                };
                yield this.rabbitMQ.publish("project.team.creation", message);
                return {
                    status: 201,
                    message: "project creation succefully completed",
                };
            }
            catch (error) {
                console.log(`Error on createProjectUseCases:${error}`);
                return { status: 500, message: "Internel Server Error" };
            }
        });
    }
}
exports.CreateProject = CreateProject;
