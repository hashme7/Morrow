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
exports.GetTeamMembers = void 0;
class GetTeamMembers {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    execute(projectId, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamId = yield this.repository.getTeamIdByProject(Number(projectId));
                if (!teamId)
                    throw new Error("team is not found..");
                const teamMembersId = yield this.repository.getTeamMembers(teamId);
                const totalItems = teamMembersId.length;
                const offset = (page - 1) * limit;
                const paginatedMembers = yield this.repository.findUsersByIds(teamMembersId, offset, limit);
                return {
                    status: 200,
                    message: "Team members found",
                    data: paginatedMembers,
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                };
            }
            catch (error) {
                console.log(`Error on executing the get team member: ${error}`);
                throw error;
            }
        });
    }
}
exports.GetTeamMembers = GetTeamMembers;
