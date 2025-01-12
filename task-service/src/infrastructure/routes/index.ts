import express from "express";
import {
  apiController,
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
router
  .route("/get-diagram")
  .get(diagramController.getDiagram.bind(diagramController));

// (APITOOL-ROUTES) //
router.route("/save-api").post(apiController.saveApi.bind(apiController));
router.route('/api-test').post(apiController.sendToTargetApi.bind(apiController));
router.route('/get-apis/:projectId').get(apiController.getApi.bind(apiController));

export default router;
