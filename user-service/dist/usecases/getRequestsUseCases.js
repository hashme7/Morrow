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
exports.GetRequests = void 0;
// import { IFinalRequests } from "../interfaces/types/response";
class GetRequests {
    constructor(repository, grpcProjectClient) {
        this.repository = repository;
        this.grpcProjectClient = grpcProjectClient;
        this.repository = repository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requests = yield this.repository.getRequests(userId);
                const teamIds = requests.map((req) => req.team_id.toString());
                const { projects } = yield this.grpcProjectClient.getProjectByTeamId(teamIds);
                let requestHash = new Map();
                for (let req of requests) {
                    requestHash.set(req.team_id.toString(), { note: req.note, team_id: req.team_id, _id: req._id });
                }
                const combinedRequests = projects.map((project) => {
                    var _a, _b;
                    return (Object.assign(Object.assign({}, project), { _id: String(requestHash.get(project.teamId)._id), team_id: String(requestHash.get(project.teamId).team_id), note: String(requestHash.get(project.teamId).note), projectStartDate: (_a = project.projectStartDate) !== null && _a !== void 0 ? _a : null, projectEndDate: (_b = project.projectEndDate) !== null && _b !== void 0 ? _b : null }));
                });
                return { status: 200, message: "requests ", data: combinedRequests };
            }
            catch (error) {
                console.error(`Error fetching requests: ${error}`);
                throw new Error("Failed to retrieve requests");
            }
        });
    }
}
exports.GetRequests = GetRequests;
