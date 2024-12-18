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
exports.getProjectsByUserId = void 0;
class getProjectsByUserId {
    constructor(repository, grpcClient) {
        this.repository = repository;
        this.grpcClient = grpcClient;
        this.repository = repository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { teamIds } = yield this.grpcClient.getTeamIds(userId);
                const projects = yield this.repository.getProjectsByTeamIds(teamIds);
                return { status: 200, message: "project retrieved successfylly", data: projects };
            }
            catch (error) {
                console.log(`Error on executing the getProjectByUserId: ${error}`);
                return { status: 500 };
            }
        });
    }
}
exports.getProjectsByUserId = getProjectsByUserId;
