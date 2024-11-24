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
exports.UpdateProfile = void 0;
const mongodb_1 = require("mongodb");
class UpdateProfile {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    execute(userId, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowedFields = [
                    "fullName",
                    "username",
                    "basedIn",
                    "phone",
                    "jobTitle",
                ];
                if (!allowedFields.includes(field)) {
                    throw new Error(`Field "${field}" is not allowed for updates.`);
                }
                yield this.repository.updateProfile(new mongodb_1.ObjectId(userId), field, value);
                return { status: 201, message: "update profile successfully" };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UpdateProfile = UpdateProfile;
