import express from "express";
import { controllerInstance } from "../../providers/controller";

const routes = express.Router();

routes
  .route("/create")
  .post(controllerInstance.createProject.bind(controllerInstance));
routes
  .route("/getprojects")
  .get(controllerInstance.getProject.bind(controllerInstance));

export default routes;
