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
exports.GetUser = void 0;
class GetUser {
    constructor(repository) {
        this.repository = repository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repository.getUser(userId);
                if (data) {
                    return { status: 200, message: "data fetched.", data: data };
                }
                else {
                    return { status: 204, message: "No Content", data: null };
                }
            }
            catch (error) {
                console.log(`errror on GetUser : ${error}`);
                return {
                    status: 500,
                    message: `error on GetUser : ${error}`,
                    data: null,
                };
            }
        });
    }
}
exports.GetUser = GetUser;
