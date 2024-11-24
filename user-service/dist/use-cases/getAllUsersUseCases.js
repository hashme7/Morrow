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
exports.GetAllUsers = void 0;
class GetAllUsers {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    execute(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUsers = yield this.repository.countAllUsers();
                const offset = (page - 1) * limit;
                const paginatedUsers = yield this.repository.findAllUsers(offset, limit);
                if (!paginatedUsers.length) {
                    return {
                        status: 404,
                        message: "No users found.",
                    };
                }
                return {
                    status: 200,
                    message: "Users retrieved successfully.",
                    data: paginatedUsers,
                    totalItems: totalUsers,
                    totalPages: Math.ceil(totalUsers / limit),
                };
            }
            catch (error) {
                console.log(`Error on get all users  : ${error}`);
                return {
                    status: 500,
                    message: `Internel server error on get all user: ${error}`,
                };
            }
        });
    }
}
exports.GetAllUsers = GetAllUsers;
