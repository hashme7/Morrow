"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../providers/controller");
const router = express_1.default.Router();
// (TASK-ROUTES) //
router
    .route("/create-task/:teamId")
    .post(controller_1.taskController.createTask.bind(controller_1.taskController));
router
    .route("/deletetask")
    .delete(controller_1.taskController.deleteTask.bind(controller_1.taskController));
router
    .route("/getTasks/:teamId")
    .get(controller_1.taskController.getTask.bind(controller_1.taskController));
router
    .route("/update-taskStatus/:team_id")
    .put(controller_1.taskController.updateStatus.bind(controller_1.taskController));
// (STATUS-ROUTES) //
router
    .route("/create-status")
    .post(controller_1.statusController.create.bind(controller_1.statusController));
router
    .route("/get-status/:team_id")
    .get(controller_1.statusController.get.bind(controller_1.statusController));
router
    .route("/update-status/:team_id")
    .post(controller_1.statusController.update.bind(controller_1.statusController));
router
    .route("/delete-task/:team_id")
    .delete(controller_1.statusController.delete.bind(controller_1.statusController));
// (DIAGRAM-ROUTES) //
router
    .route("/save-diagram")
    .post(controller_1.diagramController.saveDiagram.bind(controller_1.diagramController));
exports.default = router;
