"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../providers/controller");
const routes = express_1.default.Router();
routes
    .route("/create")
    .post(controller_1.controllerInstance.createProject.bind(controller_1.controllerInstance));
routes.route('/').get(() => { console.log('hit on /'); });
exports.default = routes;
