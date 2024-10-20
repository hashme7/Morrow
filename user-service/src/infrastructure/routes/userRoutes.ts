import express from "express";
import { authControllerInstance } from "../../providers/controller";
// import { UserAuthController } from ""

const router = express.Router();

router
  .route("/sign-up")
  .post(authControllerInstance.signup.bind(authControllerInstance));
router
  .route("/verify-otp")
  .post(authControllerInstance.verifyOtp.bind(authControllerInstance));
router
  .route("/resend-otp")
  .post(authControllerInstance.resendOtp.bind(authControllerInstance));
router
  .route("/login")
  .post(authControllerInstance.login.bind(authControllerInstance));
router
  .route("/google-login")
  .post(authControllerInstance.googleLogin.bind(authControllerInstance));
router
  .route("/github-login")
  .post(authControllerInstance.gitHubLogin.bind(authControllerInstance));
router
  .route("/validate-token")
  .get(authControllerInstance.validateToken.bind(authControllerInstance));
router.route('/Full-Name').post()
router
  .route("/logout")
  .post(authControllerInstance.logout.bind(authControllerInstance));

export default router;
