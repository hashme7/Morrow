"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const user_1 = require("morrow-common/dist/grpc/user");
class GrpcServer {
    constructor(userService) {
        this.userService = userService;
        this.server = new grpc_js_1.Server();
        this.start();
    }
    start() {
        this.server.addService(user_1.UserServiceService, this.userService);
        this.server.bindAsync("localhost:8080", grpc_js_1.ServerCredentials.createInsecure(), () => {
            console.log("gRPC server running at http://localhost:8080");
            this.server.start();
        });
    }
}
exports.GrpcServer = GrpcServer;
