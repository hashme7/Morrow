import { Controller } from "./../../adaptors/controller";
import { Router } from "express";

import { controllerInstance } from "../../providers/controller";

const router = Router();

router
  .route("/sign-up")
  .post(controllerInstance.signUpUser.bind(controllerInstance));
router
  .route("/verify-otp")
  .post(controllerInstance.verifyUser.bind(controllerInstance));
router
  .route("/resend-otp")
  .post(controllerInstance.resendOtp.bind(controllerInstance));
router.route("/login").post(controllerInstance.login.bind(controllerInstance));
router
  .route("/validate-token")
  .get(controllerInstance.validateToken.bind(controllerInstance));
router
  .route("/forgot-password")
  .post(controllerInstance.forgotPassword.bind(controllerInstance));
router
  .route("/verify-password/:token")
  .post(controllerInstance.verifyPassword.bind(controllerInstance));
router
  .route("/logout")
  .post(controllerInstance.logout.bind(controllerInstance));
router
  .route("/google-login")
  .post(controllerInstance.googleLogin.bind(controllerInstance));
router
  .route("/github-login")
  .post(controllerInstance.gitHubLogin.bind(controllerInstance));

export default router;
