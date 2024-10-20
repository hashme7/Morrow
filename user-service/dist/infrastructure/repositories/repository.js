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
const mongodb_1 = require("mongodb");
class Repository {
    constructor() {
        console.log("repository initialized");
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
    updateFullName(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { fullName: name } }, { new: true });
                console.log(user);
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                console.error(`Error on updating the `);
                throw error;
            }
        });
    }
    verifyOtp(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield verificationCodeModel_1.default.findOne({ user: userId }).sort({ _id: -1 });
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
                const otp = new verificationCodeModel_1.default({ user: userId, code: verificationCode, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
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
    createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data.projectId, data.projectName, data.teamId);
            const newTeam = new teamModel_1.default({
                _id: new mongodb_1.ObjectId(data.teamId),
                name: data.projectName,
                projectId: data.projectId,
            });
            yield newTeam.save();
            return newTeam;
        });
    }
}
exports.default = Repository;
