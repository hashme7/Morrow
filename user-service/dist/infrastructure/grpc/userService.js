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
exports.UserService = void 0;
// Implementation of the UserServiceServer interface
class UserService {
    constructor(repository) {
        this.getTeamIds = (call, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = call.request;
                const teamIds = yield repository.getTeamIdsByUserId(userId);
                const response = { teamIds };
                callback(null, response);
            }
            catch (error) {
                console.error("Error in getTeamIds:", error);
                callback({
                    code: 13,
                    message: "Unknown error occurred",
                }, null);
            }
        });
        this["getTeamIds"] = this.getTeamIds;
    }
}
exports.UserService = UserService;
