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
exports.UpdateRole = void 0;
const mongoose_1 = require("mongoose");
class UpdateRole {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId, teamId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedRole = yield this.repository.changeRole(new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(teamId), role);
                return { status: 200, data: updatedRole, message: "updated succesfully" };
            }
            catch (error) {
                console.log(`Error on udpate role usecases ${error}`);
                throw new Error(`Error on udpate role usecases ${error}`);
            }
        });
    }
}
exports.UpdateRole = UpdateRole;
