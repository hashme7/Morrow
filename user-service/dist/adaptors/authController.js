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
class UserAuthController {
    constructor(signUpCases, verifyOtpCases, resendOtpCases, loginCases, updateFullNameCases, googleLoginCases, githubLoginCases, validateTokenCases) {
        this.signUpCases = signUpCases;
        this.verifyOtpCases = verifyOtpCases;
        this.resendOtpCases = resendOtpCases;
        this.loginCases = loginCases;
        this.updateFullNameCases = updateFullNameCases;
        this.googleLoginCases = googleLoginCases;
        this.githubLoginCases = githubLoginCases;
        this.validateTokenCases = validateTokenCases;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const response = yield this.signUpCases.execute(userData);
                res.status(response.status).json(response.data);
            }
            catch (error) {
                console.log(`error on userAuth controller ${error} `);
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, userId } = req.body;
                const response = yield this.verifyOtpCases.execute(userId, otp);
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
                const response = yield this.resendOtpCases.execute(userId);
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
                const result = yield this.loginCases.execute(email, password);
                if (result.status === 200 && result.tokens) {
                    const { accessToken, refreshToken } = result.tokens;
                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    return res.status(200).json({
                        message: "Login successful",
                        accessToken,
                        refreshToken,
                    });
                }
                else {
                    return res
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
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`on google login......`);
                const { token } = req.body;
                if (!token) {
                    res.status(401).json({ message: "Missing token" });
                }
                const { status, message, tokens } = yield this.googleLoginCases.execute(token);
                res.status(status).json({
                    message: message,
                    refreshToken: tokens.refreshToken,
                    accessToken: tokens.accessToken,
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
                    return res.status(401).json({ message: "missing code for github" });
                }
                const { status, message, tokens } = yield this.githubLoginCases.execute(code);
                res.status(status).json({
                    message: message,
                    refreshToken: tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken,
                    accessToken: tokens === null || tokens === void 0 ? void 0 : tokens.accessToken,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internel Server Error" });
            }
        });
    }
    validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            console.log(token, ".............");
            if (!token) {
                console.log("token not provided");
                return res.status(400).json({ message: "Token not provided" });
            }
            try {
                const { status, valid, message } = yield this.validateTokenCases.execute(token);
                res.status(status).json({ status, valid, message });
            }
            catch (error) {
                console.error("Error validating token:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    updateFullName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, userId } = req.body;
            try {
                const { status, message } = yield this.updateFullNameCases.execute(name, userId);
                res.status(status).json({ message: message });
            }
            catch (error) {
                console.log(`error on updateFullName ${error}`);
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("logout");
            try {
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                return res.status(200).json({ message: "Logged out successfully" });
            }
            catch (error) {
                console.log(error, "error on");
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
}
exports.default = UserAuthController;
