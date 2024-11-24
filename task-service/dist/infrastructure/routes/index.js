"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../providers/controller");
const router = express_1.default.Router();
router.route('/create').post(controller_1.taskController.createTask.bind(controller_1.taskController));
router.route('/deletetask').delete(controller_1.taskController.deleteTask.bind(controller_1.taskController));
exports.default = router;
