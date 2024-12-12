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
router.route('/create-status').post(controller_1.statusController.create.bind(controller_1.statusController));
router.route('/get-status/:team_id').get(controller_1.statusController.get.bind(controller_1.statusController));
router.route('/update-status/:team_id').post(controller_1.statusController.update.bind(controller_1.statusController));
router.route('/delete-task/:team_id').delete(controller_1.statusController.delete.bind(controller_1.statusController));
exports.default = router;
