"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../providers/controller");
const router = (0, express_1.Router)();
router
    .route("/sign-up")
    .post(controller_1.controllerInstance.signUpUser.bind(controller_1.controllerInstance));
router
    .route("/verify-otp")
    .post(controller_1.controllerInstance.verifyUser.bind(controller_1.controllerInstance));
router
    .route("/resend-otp")
    .post(controller_1.controllerInstance.resendOtp.bind(controller_1.controllerInstance));
router.route("/login").post(controller_1.controllerInstance.login.bind(controller_1.controllerInstance));
router
    .route("/validate-token")
    .get(controller_1.controllerInstance.validateToken.bind(controller_1.controllerInstance));
router
    .route("/logout")
    .post(controller_1.controllerInstance.logout.bind(controller_1.controllerInstance));
router
    .route("/google-login")
    .post(controller_1.controllerInstance.googleLogin.bind(controller_1.controllerInstance));
router
    .route("/github-login")
    .post(controller_1.controllerInstance.gitHubLogin.bind(controller_1.controllerInstance));
exports.default = router;
