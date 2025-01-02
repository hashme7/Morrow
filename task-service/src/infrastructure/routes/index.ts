import express from "express";
import {
  diagramController,
  statusController,
  taskController,
} from "../../providers/controller";

const router = express.Router();

// (TASK-ROUTES) //
router
  .route("/create-task/:teamId")
  .post(taskController.createTask.bind(taskController));
router
  .route("/deletetask")
  .delete(taskController.deleteTask.bind(taskController));
router
  .route("/getTasks/:teamId")
  .get(taskController.getTask.bind(taskController));
router
  .route("/update-taskStatus/:team_id")
  .put(taskController.updateStatus.bind(taskController));

// (STATUS-ROUTES) //
router
  .route("/create-status")
  .post(statusController.create.bind(statusController));
router
  .route("/get-status/:team_id")
  .get(statusController.get.bind(statusController));
router
  .route("/update-status/:team_id")
  .post(statusController.update.bind(statusController));
router
  .route("/delete-task/:team_id")
  .delete(statusController.delete.bind(statusController));

// (DIAGRAM-ROUTES) //
router
  .route("/save-diagram")
  .post(diagramController.saveDiagram.bind(diagramController));

export default router;
