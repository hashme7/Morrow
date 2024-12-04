import express from "express";
import { authControllerInstance } from "../../providers/controller";
import upload from "../middlewares/multerConfig";

const router = express.Router();

router
  .route("/user-details/:userId")
  .get(authControllerInstance.getUser.bind(authControllerInstance));
router
  .route("/user-profile/:field/:userId")
  .put(authControllerInstance.updateProfile.bind(authControllerInstance));
router
  .route("changeEmail/:userId")
  .put(authControllerInstance.updateEmail.bind(authControllerInstance));
router
  .route("/users")
  .get(authControllerInstance.findAllUsers.bind(authControllerInstance));
router
  .route("/profileImg/:userId")
  .put(
    upload.single("avatar"),
    authControllerInstance.updateImage.bind(authControllerInstance)
  );
router
  .route("/getTeamMembers")
  .get(authControllerInstance.getTeamMember.bind(authControllerInstance));
router
  .route("/createRequest")
  .post(authControllerInstance.sendRequest.bind(authControllerInstance));
router
  .route("/getRequests")
  .get(authControllerInstance.getRequest.bind(authControllerInstance));
router
  .route("/logout")
  .post(authControllerInstance.logout.bind(authControllerInstance));

export default router;
