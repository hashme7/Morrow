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
exports.Github = void 0;
const axios_1 = __importDefault(require("axios"));
class Github {
    constructor() {
        this._clientId = process.env.GITHUB_CLIENT_ID;
        this._clientSecretKey = process.env.GITHUB_CLIENT_SECRET;
    }
    getGitHubAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenResponse = yield axios_1.default.post("https://github.com/login/oauth/access_token", {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                }, {
                    headers: {
                        accept: "application/json",
                    },
                });
                return tokenResponse.data.access_token;
            }
            catch (error) {
                console.error("Error fetching GitHub access token:", error);
                return null;
            }
        });
    }
    getGitHubUserData(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!accessToken) {
                    return null;
                }
                const userResponse = yield axios_1.default.get("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const emailsResponse = yield axios_1.default.get("https://api.github.com/user/emails", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const email = emailsResponse.data.filter((data) => {
                    if (data.primary) {
                        return data;
                    }
                });
                return {
                    user: userResponse.data,
                    email: email[0].email,
                };
            }
            catch (error) {
                console.error("Error fetching GitHub user data:", error);
                throw new Error("Error fetching GitHub user data");
            }
        });
    }
}
exports.Github = Github;
