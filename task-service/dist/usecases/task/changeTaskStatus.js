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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTaskStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ChangeTaskStatus {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    execute(id, teamId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.updateTaskStatus(new mongoose_1.default.Types.ObjectId(id), new mongoose_1.default.Types.ObjectId(teamId), status);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ChangeTaskStatus = ChangeTaskStatus;
