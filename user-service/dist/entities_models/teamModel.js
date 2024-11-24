"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teamSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    projectId: {
        type: Number,
        required: true,
        unique: true
    },
}, { timestamps: true });
const Team = mongoose_1.default.model("Team", teamSchema);
exports.default = Team;
