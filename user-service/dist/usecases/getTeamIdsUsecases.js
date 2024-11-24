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
exports.GetTeamIdsUseCase = void 0;
class GetTeamIdsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamIds = yield this.repository.getTeamIdsByUserId(userId);
                return { status: 200, message: "data fetched.", data: teamIds };
            }
            catch (error) {
                console.error(`Failed to get team IDs for user ${userId}:`, error);
                throw new Error("Unable to retrieve team IDs at this time.");
            }
        });
    }
}
exports.GetTeamIdsUseCase = GetTeamIdsUseCase;
