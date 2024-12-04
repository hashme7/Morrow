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
exports.ProjectService = void 0;
class ProjectService {
    constructor(repository) {
        this.getProjectDetails = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { teamIds } = call.request;
                const projects = (yield repository.getProjectsByTeamIds(teamIds)).map((project) => (Object.assign(Object.assign({}, project), { teamId: project.teamId || "", projectStartDate: project.plannedStartDate || "", projectEndDate: project.projectEndDate || undefined })));
                ;
                callback(null, { projects });
            }
            catch (error) {
                console.log(`Error in getProjectDetails : ${error}`);
                callback({ code: 13, message: "unkown error occured." }, null);
            }
        });
        this["getProjectDetails"] = this.getProjectDetails;
    }
}
exports.ProjectService = ProjectService;
