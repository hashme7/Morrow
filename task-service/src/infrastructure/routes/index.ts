import express from 'express';
import { taskController } from '../../providers/controller';
const router = express.Router();


router.route('/create').post(taskController.createTask.bind(taskController))
router.route('/deletetask').delete(taskController.deleteTask.bind(taskController));



export default router;