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
exports.CreateTeam = void 0;
const rabbitMQConfig_1 = require("../infrastructure/rabbitMQ/config/rabbitMQConfig");
class CreateTeam {
    constructor(repository, rabbitMQ) {
        this.repository = repository;
        this.rabbitMQ = rabbitMQ;
    }
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = JSON.parse(message.content.toString());
            const newTeam = yield this.repository.createTeam(response);
            if (newTeam) {
                yield this.repository.addTeamMembers(response.userId, newTeam._id);
                yield this.repository.addRole(response.userId, newTeam._id, "ProjectManager");
                yield this.rabbitMQ.publish(rabbitMQConfig_1.rabbitMQConfig.queueName2, {
                    projectId: newTeam.projectId,
                    teamId: newTeam._id.toString().trim(),
                });
            }
            else {
                throw new Error("error creating team and team Members");
            }
        });
    }
}
exports.CreateTeam = CreateTeam;
