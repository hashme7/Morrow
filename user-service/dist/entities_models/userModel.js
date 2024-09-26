"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 64
    },
    password: {
        type: String,
        required: true,
        maxlength: 64
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },
    isProjectManager: {
        type: Boolean,
        default: false
    },
    registrationTime: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
