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
exports.Repository = void 0;
const prismaClient_1 = __importDefault(require("../../models/prismaClient"));
class Repository {
    constructor() {
        console.log("project repository is initialized.....");
    }
    create(projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sanitizedDescription = (_a = projectData.description) === null || _a === void 0 ? void 0 : _a.replace(/\0/g, "");
                const plannedStartDate = new Date(projectData.plannedStartDate.year, projectData.plannedStartDate.month - 1, projectData.plannedStartDate.day);
                const plannedEndDate = new Date(projectData.plannedEndDate.year, projectData.plannedEndDate.month - 1, projectData.plannedEndDate.day);
                const project = yield prismaClient_1.default.project.create({
                    data: {
                        name: projectData.name,
                        plannedStartDate: plannedStartDate,
                        plannedEndDate: plannedEndDate,
                        projectDescription: sanitizedDescription,
                    },
                });
                return project;
            }
            catch (error) {
                console.log("Error on saving project:", error);
            }
        });
    }
    updateTeamId(projectId, teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProject = yield prismaClient_1.default.project.update({
                    where: { id: projectId },
                    data: { teamId: teamId },
                });
                return updatedProject;
            }
            catch (error) {
                console.error(`Error updating Team ID for project ${projectId}: `, error);
                throw error;
            }
        });
    }
    getProjectsByTeamIds(teamIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield prismaClient_1.default.project.findMany({
                    where: {
                        teamId: {
                            in: teamIds,
                        }
                    }
                });
                return projects;
            }
            catch (error) {
                console.log(`error on finding project with teamids : ${error}`);
                throw error;
            }
        });
    }
    getProjectByTeamId(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield prismaClient_1.default.project.findFirst({
                    where: {
                        teamId: teamId,
                    }
                });
                if (project) {
                    return project;
                }
                else {
                    throw new Error("no project are ther");
                }
            }
            catch (error) {
                console.log(`error on getting project by team id  ${error}`);
                throw error;
            }
        });
    }
}
exports.Repository = Repository;
