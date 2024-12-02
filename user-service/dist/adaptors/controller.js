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
    constructor(getUserCases, changePasswordCases, changeEmailCases, getTeamMembers, updateImg, getAllUsers, createRequest, updateProfileCases, getRequestDetails) {
        this.getUserCases = getUserCases;
        this.changePasswordCases = changePasswordCases;
        this.changeEmailCases = changeEmailCases;
        this.getTeamMembers = getTeamMembers;
        this.updateImg = updateImg;
        this.getAllUsers = getAllUsers;
        this.createRequest = createRequest;
        this.updateProfileCases = updateProfileCases;
        this.getRequestDetails = getRequestDetails;
        this.getUserCases = getUserCases;
        this.changePasswordCases = changePasswordCases;
        this.changeEmailCases = changeEmailCases;
        this.getTeamMembers = getTeamMembers;
        this.updateImg = updateImg;
        this.getAllUsers = getAllUsers;
        this.createRequest = createRequest;
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
    getRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                const { status, data, message } = yield this.getRequestDetails.execute(new mongodb_1.ObjectId(userId));
                res.status(status).json({ data, message });
            }
            catch (error) {
                console.log(`Error on get Request : ${error}`);
                res.status(500).json({ message: `Internel server error` });
            }
        });
    }
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
