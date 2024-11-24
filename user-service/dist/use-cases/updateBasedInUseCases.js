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
exports.UpdateBasedIn = void 0;
class UpdateBasedIn {
    constructor(repository) {
        this.repository = repository;
    }
    execute(basedIn, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.repository.updateBasedIn(basedIn, userId);
                return {
                    status: 201,
                    message: "full basedin updated success fully",
                    data: updatedUser,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    message: "basedin updating is failed ",
                    valid: false,
                };
            }
        });
    }
}
exports.UpdateBasedIn = UpdateBasedIn;
