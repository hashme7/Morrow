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
        this.server.bindAsync("localhost:7070", grpc_js_1.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                console.error("Failed to bind gRPC server:", err);
                return;
            }
            console.log(`gRPC server is running at project service on port: ${port}`);
            this.server.start();
        });
    }
}
exports.GrpcServer = GrpcServer;
