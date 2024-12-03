import { Router } from "express";
import chatController from "../../providers/controller";

const router = Router();

router.route('/').get(chatController.getChats.bind(chatController));


export default router;