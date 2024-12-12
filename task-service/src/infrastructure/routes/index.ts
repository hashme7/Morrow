import express from 'express';
import { statusController, taskController } from '../../providers/controller';
const router = express.Router();


router.route('/create').post(taskController.createTask.bind(taskController))
router.route('/deletetask').delete(taskController.deleteTask.bind(taskController));
router.route('/create-status').post(statusController.create.bind(statusController));
router.route('/get-status/:team_id').get(statusController.get.bind(statusController));
router.route('/update-status/:team_id').post(statusController.update.bind(statusController));
router.route('/delete-task/:team_id').delete(statusController.delete.bind(statusController))


export default router;