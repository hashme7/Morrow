import express from "express";
import chatController from "../../providers/controller";

const router = express.Router();

router.route("/sendMessage").post(chatController.sendChat.bind(chatController));
router.route('/getMessage').get(chatController.getMessage.bind(chatController));

export default router;
