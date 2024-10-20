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
exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const morrow_common_1 = require("morrow-common");
class Login {
    constructor(repository) {
        this.repository = repository;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository.findByEmail(email);
                if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                    return {
                        status: 401,
                        message: "invalid credentials OR user is not there",
                        valid: false,
                    };
                }
                const accessToken = morrow_common_1.JWTService.createAccessToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                const refreshToken = morrow_common_1.JWTService.createRefreshToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                return {
                    status: 200,
                    message: "Login successfully completed",
                    tokens: { accessToken, refreshToken },
                };
            }
            catch (error) {
                console.log("error on login", error);
                return { status: 500, message: "Internal server error" };
            }
        });
    }
}
exports.Login = Login;
