import express from "express";
import { controllerInstance } from "../../providers/controller";
import { modify } from "../middlewares/setParamsMiddleware";

const routes = express.Router();

routes
  .route("/create")
  .post(modify,controllerInstance.createProject.bind(controllerInstance));
routes
  .route("/getprojects")
  .get(modify, controllerInstance.getProject.bind(controllerInstance));

export default routes;
