"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../providers/controller");
const multerConfig_1 = __importDefault(require("../middlewares/multerConfig"));
const router = express_1.default.Router();
router
    .route("/user-details/:userId")
    .get(controller_1.authControllerInstance.getUser.bind(controller_1.authControllerInstance));
router
    .route("/user-profile/:field/:userId")
    .put(controller_1.authControllerInstance.updateProfile.bind(controller_1.authControllerInstance));
router
    .route("changeEmail/:userId")
    .put(controller_1.authControllerInstance.updateEmail.bind(controller_1.authControllerInstance));
router
    .route("/users")
    .get(controller_1.authControllerInstance.findAllUsers.bind(controller_1.authControllerInstance));
router
    .route("/profileImg/:userId")
    .put(multerConfig_1.default.single("avatar"), controller_1.authControllerInstance.updateImage.bind(controller_1.authControllerInstance));
router
    .route("/getTeamMembers")
    .get(controller_1.authControllerInstance.getTeamMember.bind(controller_1.authControllerInstance));
router
    .route("/createRequest")
    .post(controller_1.authControllerInstance.sendRequest.bind(controller_1.authControllerInstance));
router
    .route("/getRequests")
    .get(controller_1.authControllerInstance.getRequest.bind(controller_1.authControllerInstance));
router
    .route("/acceptRequest")
    .post(controller_1.authControllerInstance.acceptReq.bind(controller_1.authControllerInstance));
router
    .route("/declineRequest")
    .post(controller_1.authControllerInstance.declineReq.bind(controller_1.authControllerInstance));
router
    .route("/logout")
    .post(controller_1.authControllerInstance.logout.bind(controller_1.authControllerInstance));
exports.default = router;
