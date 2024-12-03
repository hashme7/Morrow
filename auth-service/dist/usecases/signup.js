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
exports.signupUser = void 0;
const code_generator_1 = require("../libraries/code-generator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class signupUser {
    constructor(repository, nodemailer) {
        this.saltRounds = 10;
        this.repository = repository;
        this.nodemailer = nodemailer;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository.findByEmail(userData.email);
                console.log(userData, user, "userdata and user......");
                if (user && user.isVerified) {
                    return {
                        status: 400,
                        message: "User already exists",
                    };
                }
                console.log("password", userData.password);
                const hashedPassword = yield bcryptjs_1.default.hash(userData.password, this.saltRounds);
                const hashedUser = Object.assign(Object.assign({}, userData), { password: hashedPassword });
                const newUser = yield this.repository.insertOne(hashedUser);
                const verificationCode = (0, code_generator_1.generateVerificationCode)();
                yield this.repository.saveOtp(newUser._id, verificationCode);
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
}
exports.signupUser = signupUser;
