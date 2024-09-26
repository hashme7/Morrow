"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../providers/controller");
// import { UserAuthController } from ""
const router = express_1.default.Router();
router
    .route("/sign-up")
    .post(controller_1.authControllerInstance.signup.bind(controller_1.authControllerInstance));
router
    .route("/verify-otp")
    .post(controller_1.authControllerInstance.verifyOtp.bind(controller_1.authControllerInstance));
router
    .route("/resend-otp")
    .post(controller_1.authControllerInstance.resendOtp.bind(controller_1.authControllerInstance));
router
    .route("/login")
    .post(controller_1.authControllerInstance.login.bind(controller_1.authControllerInstance));
router
    .route("/google-login")
    .post(controller_1.authControllerInstance.googleLogin.bind(controller_1.authControllerInstance));
router
    .route("/github-login")
    .post(controller_1.authControllerInstance.gitHubLogin.bind(controller_1.authControllerInstance));
router
    .route("/validate-token")
    .get(controller_1.authControllerInstance.validateToken.bind(controller_1.authControllerInstance));
router
    .route("/logout")
    .post(controller_1.authControllerInstance.logout.bind(controller_1.authControllerInstance));
exports.default = router;
