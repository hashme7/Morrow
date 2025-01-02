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
exports.AuthorizeMiddleware = void 0;
class AuthorizeMiddleware {
    constructor(repository) {
        this.repository = repository;
        this.rolePermissions = {
            developer: ["view_tasks", "update_tasks"],
            project_manager: [
                "create_tasks",
                "view_tasks",
                "update_tasks",
                "delete_tasks",
                "change_role",
                "team_member",
            ],
            team_lead: ["assign_tasks", "create_tasks", "delete_tasks", "view_tasks"],
        };
    }
    authorize(requiredRole) {
        return __awaiter(this, void 0, void 0, function* () {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, teamId } = req.query;
                    const role = yield this.repository.getRole(teamId, teamId);
                    if (!role)
                        return res
                            .status(403)
                            .json({ message: "Access denied: Insufficient permissions." });
                    if (this.rolePermissions[role.role].includes(requiredRole))
                        return res
                            .status(403)
                            .json({ message: "Access denied: Insufficient permissions." });
                    next();
                }
                catch (error) {
                    throw error;
                }
            });
        });
    }
}
exports.AuthorizeMiddleware = AuthorizeMiddleware;
