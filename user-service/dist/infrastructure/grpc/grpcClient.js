"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcClient = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const user_1 = require("morrow-common/dist/grpc/user");
class GrpcClient {
    constructor() {
        this.client = new user_1.UserServiceClient("localhost:8080", grpc_js_1.credentials.createInsecure());
        console.log('grpc client is running....');
    }
}
exports.GrpcClient = GrpcClient;
