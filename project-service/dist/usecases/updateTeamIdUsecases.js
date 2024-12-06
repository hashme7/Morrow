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
exports.UpdateTeamId = void 0;
class UpdateTeamId {
    constructor(repository) {
        this.repository = repository;
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = JSON.parse(message.content.toString());
                console.log(response.projectId, response.teamId, "fajskdfjkajsdfkajsdkfjaksjdf=+++++++++++++++++++++++++++++++++++++++++");
                yield this.repository.updateTeamId(response.projectId, response.teamId);
                return { status: 200, message: "teamid updated succefuly on project" };
            }
            catch (error) {
                console.log(`Error on update the team id in project : ${error}`);
                throw error;
            }
        });
    }
}
exports.UpdateTeamId = UpdateTeamId;
