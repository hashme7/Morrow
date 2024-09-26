import express from "express";
import { controllerInstance } from "../../providers/controller";

const routes = express.Router();

routes
  .route("/create")
  .post(controllerInstance.createProject.bind(controllerInstance));
routes.route('/').get(()=>{console.log('hit on /')})

export default routes;
