"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../../providers/controller"));
const router = express_1.default.Router();
router.route("/sendMessage").post(controller_1.default.sendChat.bind(controller_1.default));
router.route('/getMessage').get(controller_1.default.getMessage.bind(controller_1.default));
exports.default = router;
