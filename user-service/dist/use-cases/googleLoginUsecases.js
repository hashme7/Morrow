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
exports.GoogleLogin = void 0;
const google_auth_library_1 = require("google-auth-library");
const morrow_common_1 = require("morrow-common");
class GoogleLogin {
    constructor(repository) {
        this.repository = repository;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield this.googleClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload) {
                    return {
                        status: 401,
                        message: "Invalid Google token",
                    };
                }
                const { email, name } = payload;
                let user = yield this.repository.findByEmail(email);
                if (!user && email && name) {
                    user = yield this.repository.insertOne({
                        email,
                        username: name,
                        password: "",
                        role: "",
                        isVerified: true,
                    });
                }
                if (user && email && name) {
                    const accessToken = morrow_common_1.JWTService.createAccessToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                    const refreshToken = morrow_common_1.JWTService.createRefreshToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                    console.log(`access token: ${accessToken} , refreshToken: ${refreshToken}`);
                    return {
                        status: 200,
                        tokens: {
                            accessToken,
                            refreshToken,
                        },
                        message: "Login successfully completed",
                    };
                }
                return {
                    status: 401,
                    message: "Invalid Google token",
                };
            }
            catch (error) {
                console.error("Error during Google login:", error);
                return { status: 500, message: "Internal server error" };
            }
        });
    }
}
exports.GoogleLogin = GoogleLogin;
