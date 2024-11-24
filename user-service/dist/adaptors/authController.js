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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
class UserAuthController {
    constructor(signUpCases, verifyOtpCases, resendOtpCases, loginCases, googleLoginCases, githubLoginCases, validateTokenCases, getUserCases, changePasswordCases, changeEmailCases, getTeamMembers, updateImg, getAllUsers, createRequest, 
    // private readonly getRequests:IGetRequests
    updateProfileCases) {
        this.signUpCases = signUpCases;
        this.verifyOtpCases = verifyOtpCases;
        this.resendOtpCases = resendOtpCases;
        this.loginCases = loginCases;
        this.googleLoginCases = googleLoginCases;
        this.githubLoginCases = githubLoginCases;
        this.validateTokenCases = validateTokenCases;
        this.getUserCases = getUserCases;
        this.changePasswordCases = changePasswordCases;
        this.changeEmailCases = changeEmailCases;
        this.getTeamMembers = getTeamMembers;
        this.updateImg = updateImg;
        this.getAllUsers = getAllUsers;
        this.createRequest = createRequest;
        this.updateProfileCases = updateProfileCases;
        this.signUpCases = signUpCases;
        this.verifyOtpCases = verifyOtpCases;
        this.resendOtpCases = resendOtpCases;
        this.loginCases = loginCases;
        this.googleLoginCases = googleLoginCases;
        this.githubLoginCases = githubLoginCases;
        this.validateTokenCases = validateTokenCases;
        this.getUserCases = getUserCases;
        this.changePasswordCases = changePasswordCases;
        this.changeEmailCases = changeEmailCases;
        this.getTeamMembers = getTeamMembers;
        this.updateImg = updateImg;
        this.getAllUsers = getAllUsers;
        this.createRequest = createRequest;
        // this.getRequests = getRequests
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
                    const { userId } = result;
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
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`on google login......`);
                const { token } = req.body;
                if (!token) {
                    res.status(401).json({ message: "Missing token" });
                }
                const { status, message, tokens, userId } = yield this.googleLoginCases.execute(token);
                res.status(status).json({
                    message: message,
                    refreshToken: tokens.refreshToken,
                    accessToken: tokens.accessToken,
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
                const { status, message, tokens, userId } = yield this.githubLoginCases.execute(code);
                res.status(status).json({
                    message: message,
                    refreshToken: tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken,
                    accessToken: tokens === null || tokens === void 0 ? void 0 : tokens.accessToken,
                    userId,
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
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    res.status(400).json({ message: "Token not provided" });
                }
                else {
                    const { status, valid, message } = yield this.validateTokenCases.execute(token);
                    res.status(status).json({ status, valid, message });
                }
            }
            catch (error) {
                console.error("Error validating token:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const objectId = new mongoose_1.default.Types.ObjectId(userId);
                const response = yield this.getUserCases.execute(objectId);
                res.json({
                    status: response.status,
                    message: response.message,
                    data: response.data,
                });
            }
            catch (error) {
                console.log(error);
                res.json({ status: 500, message: `error on get user ${error}` });
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, "req.bdoy of updatePassword");
            const { currentPassword, newPassword } = req.body;
            const { userId } = req.params;
            try {
                const userIdOb = new mongoose_1.default.Types.ObjectId(userId);
                const response = yield this.changePasswordCases.execute(currentPassword, newPassword, userIdOb);
                res
                    .status(response.status)
                    .json({ message: response.message, data: response.data });
            }
            catch (error) {
                console.log(`Errorr on uddating password: ${error}`);
                res.status(500).json({ message: `Internel server Error:${error}` });
            }
        });
    }
    updateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { userId } = req.params;
            try {
                const userIdOb = new mongoose_1.default.Types.ObjectId(userId);
                const response = yield this.changeEmailCases.execute(userIdOb, email);
                res
                    .status(response.status)
                    .json({ message: response.message, data: response.data });
            }
            catch (error) {
                res.status(500).json({ message: "internel server error" });
            }
        });
    }
    getTeamMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, page = 1 } = req.query;
                const limit = 2;
                const response = yield this.getTeamMembers.execute(projectId, Number(page), limit);
                res.status(response.status).json({
                    message: response.message,
                    data: response.data,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages,
                    currentPage: Number(page),
                });
            }
            catch (error) {
                res.status(500).json({ message: `Internal Server Error: ${error}` });
            }
        });
    }
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.file, "_____");
                const { userId } = req.params;
                if (!req.file) {
                    res.status(400).json({ message: "no files provided" });
                }
                else {
                    const b64 = Buffer.from(req.file.buffer).toString("base64");
                    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                    const userIdOb = new mongoose_1.default.Types.ObjectId(userId);
                    const response = yield this.updateImg.execute(dataURI, userIdOb);
                    res.status(response.status).json(response.data);
                }
            }
            catch (error) {
                res.status(500).json({ message: `Internel Server Error: ${error}` });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, field } = req.params; // Extract userId and field from URL
                const { value } = req.body;
                console.log();
                if (!field || value === undefined) {
                    res.status(400).json({ error: "Field and value are required." });
                    return;
                }
                yield this.updateProfileCases.execute(userId, field, value);
            }
            catch (error) {
                console.log(`Error on update profile Request : ${error}`);
                res.status(500).json({ message: "Internel Server error" });
            }
        });
    }
    findAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                const { status, data, totalItems, totalPages } = yield this.getAllUsers.execute(Number(page), 5);
                res.status(status).json({ data, totalItems, totalPages });
            }
            catch (error) {
                res.status(500).json({ message: `Internel Server Error: ${error}` });
            }
        });
    }
    sendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, userId } = req.query;
                const { status, message } = yield this.createRequest.execute(Number(projectId), new mongodb_1.ObjectId(userId));
                res.status(status).json({ message });
            }
            catch (error) {
                console.log(`Error on create Request : ${error}`);
                res.status(500).json({ message: "Internel Server error" });
            }
        });
    }
    // async getRequest(req:Request,res:Response){
    //   try {
    //     const {userId}= req.query;
    //     const {status,data,message} = await this.getRequests.execute(new ObjectId(userId as string));
    //     res.status(status).json({data,message});
    //   } catch (error) {
    //     console.log( `Error on get Request : ${error}`);
    //     res.status(500).json({message:`Internel server error`});
    //   }
    // }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("accessToken");
                res.clearCookie("refreshToken");
                res.status(200).json({ message: "Logged out successfully" });
            }
            catch (error) {
                console.log(error, "error on");
                res.status(500).json({ message: "Internel server error" });
            }
        });
    }
}
exports.default = UserAuthController;
