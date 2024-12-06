"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "seen"],
        required: true,
    },
    readBy: {
        type: [mongodb_1.ObjectId],
        default: [],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const Messages = mongoose_1.default.model('Message', MessageSchema);
exports.default = Messages;
