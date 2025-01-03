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
exports.JoinProject = void 0;
const mongodb_1 = require("mongodb");
class JoinProject {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId, requestId, teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.addTeamMembers(new mongodb_1.ObjectId(userId), new mongodb_1.ObjectId(teamId));
                yield this.repository.addRole(new mongodb_1.ObjectId(userId), new mongodb_1.ObjectId(teamId), "Developer");
                yield this.repository.deleteRequest(new mongodb_1.ObjectId(requestId));
                return { status: 204, message: "successfully entered in a project" };
            }
            catch (error) {
                console.log(`error on join project :${error.message} `);
                throw error;
            }
        });
    }
}
exports.JoinProject = JoinProject;
