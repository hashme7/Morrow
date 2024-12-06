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
exports.SendMessage = void 0;
class SendMessage {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ senderId, receiverId, content }) {
            try {
                const message = yield this.chatRepository.saveMessage({
                    senderId,
                    receiverId,
                    content,
                    status: "pending",
                });
                return { status: 201, message: "success", data: message };
            }
            catch (error) {
                console.error("Error creating message:", error.message);
                throw new Error("Failed to create message");
            }
        });
    }
}
exports.SendMessage = SendMessage;
