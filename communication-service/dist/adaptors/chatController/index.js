"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(webSocketServer) {
        this.webSocketServer = webSocketServer;
        this.webSocketServer.start();
    }
    ;
    sendMessage(projectId, userId, message) {
        try {
        }
        catch (error) {
        }
    }
}
exports.ChatController = ChatController;
