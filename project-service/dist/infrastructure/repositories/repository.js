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
const mongodb_1 = require("mongodb");
const prismaClient_1 = __importDefault(require("../../models/prismaClient"));
class Repository {
    constructor() {
        console.log("project repository is initialized.....");
    }
    create(projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = new mongodb_1.ObjectId();
                const sanitizedDescription = (_a = projectData.projectDescription) === null || _a === void 0 ? void 0 : _a.replace(/\0/g, '');
                const project = yield prismaClient_1.default.project.create({
                    data: {
                        teamId: String(id),
                        name: projectData.name,
                        projectStartDate: new Date(projectData.projectStartDate),
                        projectEndDate: new Date(projectData.projectEndDate),
                        plannedStartDate: projectData.plannedStartDate
                            ? new Date(projectData.plannedStartDate)
                            : null,
                        plannedEndDate: projectData.plannedEndDate
                            ? new Date(projectData.plannedEndDate)
                            : null,
                        projectDescription: sanitizedDescription,
                    },
                });
                return project;
            }
            catch (error) {
                console.log("error on saving project", error);
            }
        });
    }
}
exports.Repository = Repository;
