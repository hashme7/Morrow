"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../../providers/controller"));
const router = (0, express_1.Router)();
router.route('/').get(controller_1.default.getChats.bind(controller_1.default));
exports.default = router;
