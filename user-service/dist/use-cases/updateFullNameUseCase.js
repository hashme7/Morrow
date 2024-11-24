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
exports.updateFullName = void 0;
class updateFullName {
    constructor(repository) {
        this.repository = repository;
    }
    execute(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.repository.updateFullName(name, userId);
                return {
                    status: 201,
                    message: "full name updated success fully",
                    data: updatedUser,
                };
            }
            catch (error) {
                return { status: 500, message: "name updating is failed ", valid: false };
            }
        });
    }
}
exports.updateFullName = updateFullName;
