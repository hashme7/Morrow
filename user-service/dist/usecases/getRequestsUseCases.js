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
                const teamIds = requests.map((req) => req.teamId.toString());
                const response = yield this.grpcProjectClient.getProjectByTeamId(teamIds);
                let requestHash = new Map();
                for (let req of requests) {
                    requestHash.set(req.teamId, req.note);
                }
                const combinedRequests = response.projects.map((project) => (Object.assign(Object.assign({}, project), { note: requestHash.get(project.teamId) })));
                return { status: 200, message: "requests ", data: combinedRequests };
            }
            catch (error) {
                console.log(`Error on GetRequests ${error} `);
                throw error;
            }
        });
    }
}
exports.GetRequests = GetRequests;
