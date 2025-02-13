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
        this.server.bindAsync("0.0.0.0:8080", grpc_js_1.ServerCredentials.createInsecure(), (error, port) => {
            if (error) {
                console.error("Server binding error:", error);
                return;
            }
            console.log(`gRPC server is running at user service on port: ${port}`);
            console.log(`gRPC server address: ${this.server}`);
        });
    }
}
exports.GrpcServer = GrpcServer;
