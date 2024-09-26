"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const teamMemberSchema = new mongoose_1.default.Schema({
    team_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    user_account: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});
const teamMember = mongoose_1.default.model('Team_Member', teamMemberSchema);
exports.default = teamMember;
