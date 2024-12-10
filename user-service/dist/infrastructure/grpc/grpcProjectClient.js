"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcProjectClient = void 0;
const cmn_js_1 = require("morrow-common/dist/grpc/cmn.js");
const grpc_js_1 = require("@grpc/grpc-js");
class GrpcProjectClient {
    constructor() {
        this.client = new cmn_js_1.ProjectServiceClient("localhost:7070", grpc_js_1.credentials.createInsecure());
        console.log(`grpc client for project server is running`);
    }
    getProjectByTeamId(teamIds) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("teamidssssssssssssssss", teamIds);
            const projectRequest = { teamIds };
            return new Promise((resolve, reject) => {
                this.client.getProjectDetails(projectRequest, (err, response) => {
                    if (err) {
                        console.log(`error on getProjectsbyTeamId ${err}`);
                        return reject(err);
                    }
                    console.log("response", response);
                    resolve(response);
                });
            });
        });
    }
}
exports.GrpcProjectClient = GrpcProjectClient;
