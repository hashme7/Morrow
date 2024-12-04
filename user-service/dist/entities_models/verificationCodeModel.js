"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const verificationCodeSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    code: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 5 * 60 * 1000),
        index: { expires: 0 },
    },
});
const VerificationCode = mongoose_1.default.model("Verification-Code", verificationCodeSchema);
exports.default = VerificationCode;
