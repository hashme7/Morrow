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
exports.ChangePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ChangePassword {
    constructor(repository) {
        this.repository = repository;
    }
    execute(cpassword, newPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(typeof cpassword, "cpassword");
            const user = yield this.repository.getUser(userId);
            if (user) {
                console.log("user is there...", user);
                // const salt = await bcrypt.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(cpassword, 10);
                console.log(hashedPassword, user.password, '...............');
                console.log(yield bcryptjs_1.default.compare(cpassword, user.password));
            }
            if (!user || !(yield bcryptjs_1.default.compare(cpassword, user.password))) {
                console.log(`invalid credentials`);
                return {
                    status: 401,
                    message: "invalid credentials OR user is not there",
                    valid: false,
                };
            }
            else {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
                const udpatedUser = yield this.repository.changePassword(userId, hashedPassword);
                return {
                    status: 200,
                    message: "password changed successfully",
                    data: udpatedUser,
                };
            }
        });
    }
}
exports.ChangePassword = ChangePassword;
