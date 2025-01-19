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
exports.Controller = void 0;
const morrow_common_1 = require("morrow-common");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Controller {
    constructor(signup, verifyOtp, reIssueOtp, loginUser, authenticateToken, googleAuth, gitHubAuth) {
        this.signup = signup;
        this.verifyOtp = verifyOtp;
        this.reIssueOtp = reIssueOtp;
        this.loginUser = loginUser;
        this.authenticateToken = authenticateToken;
        this.googleAuth = googleAuth;
        this.gitHubAuth = gitHubAuth;
    }
    signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const response = yield this.signup.execute(userData);
                res.status(response.status).json(response.data);
            }
            catch (error) {
                console.log(`error on userAuth controller ${error} `);
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, userId } = req.body;
                const response = yield this.verifyOtp.execute(userId, otp);
                res.status(response.status).json(response.message);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const response = yield this.reIssueOtp.execute(userId);
                res.status(response.status).json(response.message);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield this.loginUser.execute(email, password);
                if (result.status === 200 && result.tokens) {
                    const { accessToken, refreshToken } = result.tokens;
                    const { userId } = result;
                    res.cookie("accessToken", accessToken, {
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    res.status(200).json({
                        message: "Login successful",
                        accessToken,
                        refreshToken,
                        userId,
                    });
                }
                else {
                    res
                        .status(result.status)
                        .json({ message: result.message, token: result.tokens });
                }
            }
            catch (error) {
                console.log("Error on login:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
                if (!token) {
                    res.status(400).json({ message: "Token not provided" });
                    return;
                }
                const { status, valid, message, userId } = yield this.authenticateToken.execute(token);
                if (valid) {
                    console.log('validate complete....', status);
                    res.status(status).json({ status, valid, message, userId });
                    return;
                }
                else {
                    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
                    if (!refreshToken) {
                        res.status(401).json({ message: "Refresh token not provided" });
                        return;
                    }
                    const { id, role } = morrow_common_1.JWTService.verifyToken(refreshToken);
                    if (!id) {
                        res.status(401).json({ message: "Invalid refresh token provided" });
                        return;
                    }
                    const refreshResponse = yield this.authenticateToken.execute(refreshToken);
                    const newAccessToken = morrow_common_1.JWTService.createAccessToken(id, role);
                    const newRefreshToken = morrow_common_1.JWTService.createRefreshToken(id, role);
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    res.status(200).json({
                        message: "Token refreshed successfully",
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        valid: true,
                        userId: refreshResponse.userId
                    });
                    return;
                }
            }
            catch (error) {
                console.error("Error validating token:", error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("accessToken", {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                });
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res.status(200).json({ message: "Logged out successfully" });
            }
            catch (error) {
                console.log(error, "error on");
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                if (!token) {
                    res.status(401).json({ message: "Missing token" });
                }
                const { status, message, tokens, userId } = yield this.googleAuth.execute(token);
                if (!(tokens === null || tokens === void 0 ? void 0 : tokens.accessToken) || !(tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken)) {
                    console.log('tokens created......');
                    res.status(304).json({ message: "tokens not created..." });
                    return;
                }
                res.cookie("accessToken", tokens.accessToken, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(status).json({
                    message: message,
                    userId,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internel Server Error" });
            }
        });
    }
    gitHubLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.body;
                if (!code) {
                    res.status(401).json({ message: "missing code for github" });
                }
                const { status, message, tokens, userId } = yield this.gitHubAuth.execute(code);
                if (!(tokens === null || tokens === void 0 ? void 0 : tokens.accessToken) || !(tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken)) {
                    console.log("tokens not created.....");
                    res.status(304).json({ message: "tokens not created..." });
                    return;
                }
                res.cookie("accessToken", tokens.accessToken, {
                    httpOnly: false,
                    secure: false,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(status).json({
                    message: message,
                    userId,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internel Server Error" });
            }
        });
    }
}
exports.Controller = Controller;
