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
exports.UpdatePublicName = void 0;
class UpdatePublicName {
    constructor(repository) {
        this.repository = repository;
    }
    execute(publicName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.repository.updateUserName(publicName, userId);
                console.log(updatedUser, "udpaet");
                return {
                    status: 201,
                    message: "full name updated success fully",
                    data: updatedUser,
                };
            }
            catch (error) {
                return { status: 500, message: "public Name updating is failed ", valid: false };
            }
        });
    }
}
exports.UpdatePublicName = UpdatePublicName;
