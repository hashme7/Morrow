import express from "express";
import { controllerInstance } from "../../providers/controller";

const routes = express.Router();

routes
  .route("/create")
  .post(controllerInstance.createProject.bind(controllerInstance));
routes
  .route("/getprojects/:userId")
  .get(controllerInstance.getProject.bind(controllerInstance));

export default routes;
