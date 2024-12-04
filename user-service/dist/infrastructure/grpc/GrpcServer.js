"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const dist_1 = require("morrow-common/dist");
const grpc_js_1 = require("@grpc/grpc-js");
class GrpcServer {
    constructor(userService) {
        this.userService = userService;
        this.server = new grpc_js_1.Server();
        this.start();
    }
    start() {
        this.server.addService(dist_1.UserServiceService, this.userService);
        this.server.bindAsync("localhost:8080", grpc_js_1.ServerCredentials.createInsecure(), () => {
            console.log("gRPC server is running at user service on port : 8080");
            this.server.start();
        });
    }
}
exports.GrpcServer = GrpcServer;
