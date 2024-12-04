"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const cmn_1 = require("morrow-common/dist/grpc/cmn");
const grpc_js_1 = require("@grpc/grpc-js");
class GrpcServer {
    constructor(projectService) {
        this.projectService = projectService;
        this.server = new grpc_js_1.Server();
        this.start();
    }
    start() {
        this.server.addService(cmn_1.ProjectServiceService, this.projectService);
        this.server.bindAsync("localhost:7070", grpc_js_1.ServerCredentials.createInsecure(), () => {
            console.log(`grpc server is running at project service on port : 7070`);
        });
        this.server.start();
    }
}
exports.GrpcServer = GrpcServer;
