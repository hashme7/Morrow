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
exports.SendRequest = void 0;
class SendRequest {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    execute(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamId = yield this.repository.getTeamIdByProject(projectId);
                if (!teamId) {
                    return { status: 404, message: 'no team id found with given project id' };
                }
                yield this.repository.createRequest(teamId, userId);
                return { status: 201, message: 'request send successfully' };
            }
            catch (error) {
                console.log(`Error on send Request : ${error}`);
                throw error;
            }
        });
    }
}
exports.SendRequest = SendRequest;
