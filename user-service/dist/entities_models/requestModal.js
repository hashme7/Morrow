"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    team_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    user_account: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    }
});
const Requests = mongoose_1.default.model("Request", requestSchema);
exports.default = Requests;
