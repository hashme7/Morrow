import express from "express";
import { controllerInstance } from "../../providers/controller";
import { authenticate } from "morrow-common";

const routes = express.Router();

routes
  .route("/create")
  .post(controllerInstance.createProject.bind(controllerInstance));
routes
  .route("/getprojects")
  .get(authenticate, controllerInstance.getProject.bind(controllerInstance));

export default routes;
