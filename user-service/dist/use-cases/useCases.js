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
const code_generator_1 = require("../library/code-generator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const google_auth_library_1 = require("google-auth-library");
class UseCases {
    // private RabbitMQInstance;
    constructor(repository, nodemailer, jwt, githubClient) {
        this.saltRounds = 10;
        this.repository = repository;
        this.nodemailer = nodemailer;
        this.jwt = jwt;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        this.githubClient = githubClient;
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userData);
                const user = yield this.repository.findByEmail(userData.email);
                if (user && user.isVerified) {
                    console.log("user is verified");
                    return {
                        status: 400,
                        message: "User already exists",
                    };
                }
                const hashedPassword = yield bcryptjs_1.default.hash(userData.password, this.saltRounds);
                const hashedUser = Object.assign(Object.assign({}, userData), { password: hashedPassword });
                const newUser = yield this.repository.insertOne(hashedUser);
                const verificationCode = (0, code_generator_1.generateVerificationCode)();
                yield this.repository.saveOtp(newUser.id, verificationCode);
                const res = this.nodemailer.sendMail(userData.email, verificationCode);
                if (res) {
                    return {
                        status: 201,
                        message: "User created successfully",
                        data: newUser,
                    };
                }
                else {
                    console.log("OTP failed");
                    return {
                        status: 400,
                        message: "OTP send failed, try again",
                    };
                }
            }
            catch (error) {
                console.log(`error on signup usecase:${error}`);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
    verifyOtp(userId, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isOtpValid = yield this.repository.verifyOtp(userId, otp);
                if (!isOtpValid) {
                    return {
                        status: 400,
                        message: "Invalid or expired OTP",
                    };
                }
                yield this.repository.markUserAsVerified(userId);
                return {
                    status: 200,
                    message: "Verification successful",
                };
            }
            catch (error) {
                console.error(`Error in verify OTP use case: ${error}`);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
    resendOtp(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificationCode = (0, code_generator_1.generateVerificationCode)();
                yield this.repository.saveOtp(userId, verificationCode);
                return {
                    status: 201,
                    message: "Otp created successfully",
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
    login(email, password) {
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
                const accessToken = this.jwt.createAccessToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                const refreshToken = this.jwt.createRefreshToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
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
    googleLogin(token) {
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
                    const accessToken = this.jwt.createAccessToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                    const refreshToken = this.jwt.createRefreshToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
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
    gitHubLogin(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = yield this.githubClient.getGitHubAccessToken(code);
                const response = yield this.githubClient.getGitHubUserData(accessToken);
                if ((response === null || response === void 0 ? void 0 : response.email) && (response === null || response === void 0 ? void 0 : response.user)) {
                    let user = yield this.repository.findByEmail(response === null || response === void 0 ? void 0 : response.email);
                    if (!user) {
                        user = yield this.repository.insertOne({
                            email: response.email,
                            username: response.user.login,
                            password: "",
                            role: "developer",
                            isVerified: true,
                        });
                    }
                    const accessToken = this.jwt.createAccessToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                    const refreshToken = this.jwt.createRefreshToken(String(user.id), user.isProjectManager ? "ProjectManager" : "Developer");
                    return {
                        status: 200,
                        tokens: {
                            accessToken,
                            refreshToken,
                        },
                        message: "Login successfully completed",
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
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`validateToken`, token);
                const decoded = this.jwt.verifyToken(token);
                console.log(`decoded:
        
        `, decoded);
                if (decoded) {
                    console.log("token valid");
                    return {
                        status: 200,
                        message: "Token is valid",
                        valid: true,
                    };
                }
                else {
                    console.log("token invalid");
                    return {
                        status: 401,
                        message: "Token is invalid",
                        valid: false,
                    };
                }
            }
            catch (error) {
                console.error(`Error validating token: ${error}`);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
    createTeam(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = JSON.parse(message.content.toString());
            yield this.repository.createTeam(response);
        });
    }
}
exports.default = UseCases;
