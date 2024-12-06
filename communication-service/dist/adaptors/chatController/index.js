"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(sendMessage, fetchMessage) {
        this.sendMessage = sendMessage;
        this.fetchMessage = fetchMessage;
    }
    sendChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const senderId = req.query.senderId;
                const receiverId = req.query.receiverId;
                const content = req.query.content;
                if (!senderId || !receiverId || !content) {
                    res.status(400).json({ error: "Missing required fields" });
                    return;
                }
                const { status, message } = yield this.sendMessage.execute({
                    senderId,
                    receiverId,
                    content,
                    status: "pending",
                    timestamp: new Date(),
                    readBy: [],
                });
                res.status(status).json({ message });
            }
            catch (error) {
                console.error("Error creating message:", error.message);
                throw error;
            }
        });
    }
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomId = req.query.receiverId;
                const page = req.query.page;
                const messages = yield this.fetchMessage.execute(roomId, Number(page));
                res.status(200).json(messages);
            }
            catch (error) {
                console.error("Error getting message:", error.message);
                throw error;
            }
        });
    }
}
exports.ChatController = ChatController;
