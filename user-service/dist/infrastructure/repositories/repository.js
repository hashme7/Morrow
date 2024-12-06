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
const userModel_1 = __importDefault(require("../../entities_models/userModel"));
const teamModel_1 = __importDefault(require("../../entities_models/teamModel"));
const verificationCodeModel_1 = __importDefault(require("../../entities_models/verificationCodeModel"));
const teamMemberModel_1 = __importDefault(require("../../entities_models/teamMemberModel"));
const requestModal_1 = __importDefault(require("../../entities_models/requestModal"));
class Repository {
    constructor() {
        console.log("repository initialized");
    }
    getRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield requestModal_1.default.find({ userId: userId }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    markUserAsVerified(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.default.updateOne({ _id: userId }, { $set: { isVerified: true } });
            }
            catch (error) {
                console.error(`Error marking user as verified: ${error}`);
                throw error;
            }
        });
    }
    verifyOtp(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield verificationCodeModel_1.default.findOne({ user: userId }).sort({
                    _id: -1,
                });
                if (!otpRecord)
                    return false;
                const isOtpValid = otpRecord.code == code;
                return isOtpValid;
            }
            catch (error) {
                console.error(`Error verifying OTP: ${error}`);
                throw error;
            }
        });
    }
    saveOtp(userId, verificationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = new verificationCodeModel_1.default({
                    user: userId,
                    code: verificationCode,
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                });
                const savedOtp = yield otp.save();
                return savedOtp;
            }
            catch (error) {
                console.log(`Error saving OTP: ${error}`);
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield userModel_1.default.findOne({ email: email }));
            }
            catch (error) {
                console.log(`error on finding by email on user: ${error}`);
                throw error;
            }
        });
    }
    insertOne(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { email: userData.email };
                const update = { $set: userData };
                const options = { upsert: true, new: true };
                const newUser = yield userModel_1.default.findOneAndUpdate(filter, update, options);
                return newUser;
            }
            catch (error) {
                console.log(`Error on inserting user: ${error}`);
                throw error;
            }
        });
    }
    findUsersByIds(membersId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find({
                    _id: { $in: membersId },
                }).exec();
                return users;
            }
            catch (error) {
                console.log(`Error on finding users by ids : ${error}`);
                throw error;
            }
        });
    }
    changeEmail(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { email: email } }, { lean: true });
                return updatedUser;
            }
            catch (error) {
                console.log(`Error on updating Email : ${error}`);
                throw error;
            }
        });
    }
    getTeamIdsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userId);
                const teamIds = yield teamMemberModel_1.default.find({ user_account: userId }, { team_id: 1, _id: 0 }).exec();
                const teamIdsList = teamIds.map((team) => team.team_id.toString());
                console.log('teamIdsList                  ', teamIdsList);
                return teamIdsList;
            }
            catch (error) {
                console.log(`error on finding teamIds:${error}`);
                throw error;
            }
        });
    }
    getTeamIdByProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamId = yield teamModel_1.default.findOne({ projectId: projectId }, { _id: 1 }).exec();
                return teamId ? teamId._id : null;
            }
            catch (error) {
                console.log(`Error on getTeamIdByProjectId :${error}`);
                throw error;
            }
        });
    }
    getTeamMembers(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamMembers = yield teamMemberModel_1.default.find({ team_id: teamId }, { user_account: 1, _id: 0 }).exec();
                const userIds = teamMembers.map((member) => String(member.user_account));
                return userIds;
            }
            catch (error) {
                console.log(`Error on get team members : ${error}`);
                throw error;
            }
        });
    }
    addTeamMembers(userId, teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMember = new teamMemberModel_1.default({
                    user_account: userId,
                    team_id: teamId,
                });
                yield newMember.save();
                return newMember;
            }
            catch (error) {
                console.log(`Error on repository (addTeam Members...) . Error: ${error}`);
                throw error;
            }
        });
    }
    createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data.projectId, data.projectName, "create Team in repositioryyy................");
                const newTeam = new teamModel_1.default({
                    name: data.projectName,
                    projectId: data.projectId,
                });
                yield newTeam.save();
                return newTeam;
            }
            catch (error) {
                console.log(`Error on create Team error: ${error}`);
                throw error;
            }
        });
    }
    updateImage(img, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedImg = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { image: img } }, { new: true, lean: true });
                return updatedImg;
            }
            catch (error) {
                console.log(`Error on uploading the image ...`);
                throw error;
            }
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ _id: userId });
            return user;
        });
    }
    countAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.countDocuments();
        });
    }
    findAllUsers(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userModel_1.default.find({}).skip(offset).limit(limit);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createRequest(teamId, userId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRequest = new requestModal_1.default({
                    team_id: teamId,
                    user_account: userId,
                    note: note
                });
                yield newRequest.save();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userId, 'requestsssssss..........');
                const RequestData = yield requestModal_1.default.find({ user_account: userId });
                return RequestData;
            }
            catch (error) {
                console.log(`errror      
      
      ******************************
      ${error}
      
      `);
                throw error;
            }
        });
    }
    changePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userId);
            if (user) {
                const updatedUser = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { password: newPassword } }, { new: true, lean: true });
                return updatedUser;
            }
            return null;
        });
    }
    updateProfile(userId, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = {};
            updateData[field] = value;
            const result = yield userModel_1.default.updateOne({ _id: userId }, { $set: updateData });
            if (result.modifiedCount === 0) {
                throw new Error("No changes made. User not found or field value is the same.");
            }
        });
    }
}
exports.default = Repository;
