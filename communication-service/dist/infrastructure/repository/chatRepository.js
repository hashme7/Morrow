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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const chat_1 = __importDefault(require("../../entities_modal/chat"));
class ChatRepository {
    saveMessages(batchToSave) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield chat_1.default.insertMany(batchToSave);
            }
            catch (error) {
                console.log(`error on save message in db : ${error}`);
            }
        });
    }
    getMessages(roomId_1) {
        return __awaiter(this, arguments, void 0, function* (roomId, page = 1, limit = 20) {
            try {
                const skip = (page - 1) * limit;
                const messages = yield chat_1.default.find({ receiverId: roomId }).sort({ timestamp: -1 }).skip(skip).limit(limit);
                return messages.reverse();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
