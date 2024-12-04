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
exports.ReIssueOtp = void 0;
const code_generator_1 = require("../libraries/code-generator");
class ReIssueOtp {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificationCode = (0, code_generator_1.generateVerificationCode)();
                yield this.repository.saveOtp(userId, verificationCode);
                return {
                    status: 201,
                    message: "Otp created successfully",
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
}
exports.ReIssueOtp = ReIssueOtp;