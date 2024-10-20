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
exports.VerifyOtp = void 0;
class VerifyOtp {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isOtpValid = yield this.repository.verifyOtp(userId, otp);
                if (!isOtpValid) {
                    return {
                        status: 400,
                        message: "Invalid or expired OTP",
                    };
                }
                yield this.repository.markUserAsVerified(userId);
                return {
                    status: 200,
                    message: "Verification successful",
                };
            }
            catch (error) {
                console.error(`Error in verify OTP use case: ${error}`);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
}
exports.VerifyOtp = VerifyOtp;
