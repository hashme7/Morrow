import express from "express";
import { authControllerInstance } from "../../providers/controller";
import upload from "../middlewares/multerConfig";
import { modify } from "../middlewares/setParamsMiddleware";

const router = express.Router();

router
  .route("/user-details")
  .get(modify, authControllerInstance.getUser.bind(authControllerInstance));

router
  .route("/user-profile/:field")
  .put(
    modify,
    authControllerInstance.updateProfile.bind(authControllerInstance)
  );

router
  .route("/changeEmail")
  .put(modify, authControllerInstance.updateEmail.bind(authControllerInstance));
router
  .route("/changePassword")
  .put(
    modify,
    authControllerInstance.updatePassword.bind(authControllerInstance)
  );

router
  .route("/users")
  .get(
    modify,
    authControllerInstance.findAllUsers.bind(authControllerInstance)
  );

router
  .route("/profileImg")
  .put(
    upload.single("avatar"),
    modify,
    authControllerInstance.updateImage.bind(authControllerInstance)
  );

router
  .route("/getTeamMembers")
  .get(
    modify,
    authControllerInstance.getTeamMember.bind(authControllerInstance)
  );

router
  .route("/createRequest")
  .post(
    modify,
    authControllerInstance.sendRequest.bind(authControllerInstance)
  );

router
  .route("/getRequests")
  .get(modify, authControllerInstance.getRequest.bind(authControllerInstance));

router
  .route("/acceptRequest")
  .post(modify, authControllerInstance.acceptReq.bind(authControllerInstance));

router
  .route("/declineRequest")
  .post(modify, authControllerInstance.declineReq.bind(authControllerInstance));

router
  .route("/logout")
  .post(modify, authControllerInstance.logout.bind(authControllerInstance));

export default router;
