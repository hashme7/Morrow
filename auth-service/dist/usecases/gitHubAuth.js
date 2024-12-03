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
exports.GithubAuth = void 0;
const morrow_common_1 = require("morrow-common");
class GithubAuth {
    constructor(repository, gitHubClient) {
        this.repository = repository;
        this.gitHubClient = gitHubClient;
    }
    execute(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = yield this.gitHubClient.getGitHubAccessToken(code);
                const response = yield this.gitHubClient.getGitHubUserData(accessToken);
                if ((response === null || response === void 0 ? void 0 : response.email) && (response === null || response === void 0 ? void 0 : response.user)) {
                    let user = yield this.repository.findByEmail(response === null || response === void 0 ? void 0 : response.email);
                    if (!user) {
                        user = yield this.repository.insertOne({
                            email: response.email,
                            username: response.user.login,
                            password: "",
                            isVerified: true,
                            image: "",
                            fullName: "",
                            basedIn: "",
                            jobTitle: ""
                        });
                    }
                    const accessToken = morrow_common_1.JWTService.createAccessToken(String(user._id), user.isProjectManager ? "ProjectManager" : "Developer");
                    const refreshToken = morrow_common_1.JWTService.createRefreshToken(String(user._id), user.isProjectManager ? "ProjectManager" : "Developer");
                    return {
                        status: 200,
                        tokens: {
                            accessToken,
                            refreshToken,
                        },
                        message: "Login successfully completed",
                        userId: user._id
                    };
                }
                else {
                    return {
                        status: 401,
                        message: "Invalid GitHub token",
                    };
                }
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Internel Server Error",
                };
            }
        });
    }
}
exports.GithubAuth = GithubAuth;
