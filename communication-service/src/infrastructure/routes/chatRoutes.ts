import { Router } from "express";
import chatController from "../../providers/controller";

const router = Router();

router.route("/").post(chatController.sendChat.bind(chatController));

export default router;
