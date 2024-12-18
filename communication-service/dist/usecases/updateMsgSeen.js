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
exports.UpdateMsgSeen = void 0;
const mongoose_1 = require("mongoose");
class UpdateMsgSeen {
    constructor(repsitory) {
        this.repsitory = repsitory;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ messageId, userId }) {
            try {
                console.log(`                update message ${messageId} userId: ${userId}    `);
                const updatedMsg = yield this.repsitory.updateMsg(new mongoose_1.Types.ObjectId(messageId), new mongoose_1.Types.ObjectId(userId));
                if (updatedMsg) {
                    return updatedMsg;
                }
                else {
                    return undefined;
                }
            }
            catch (error) {
                console.log(`error on updat msg seen :${error}`);
                throw error;
            }
        });
    }
}
exports.UpdateMsgSeen = UpdateMsgSeen;
