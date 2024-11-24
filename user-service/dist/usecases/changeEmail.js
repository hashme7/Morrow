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
exports.ChangeEmail = void 0;
class ChangeEmail {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository.findByEmail(email);
                if (!user) {
                    const updatedUser = yield this.repository.changeEmail(userId, email);
                    return { status: 200, message: "update successfully", data: updatedUser };
                }
                else {
                    return { status: 403, message: "user already there" };
                }
            }
            catch (error) {
                console.log(`Error on changing email: ${email}`);
                throw error;
            }
        });
    }
}
exports.ChangeEmail = ChangeEmail;
