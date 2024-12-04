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
exports.GrpcClient = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const dist_1 = require("morrow-common/dist");
class GrpcClient {
    constructor() {
        this.client = new dist_1.UserServiceClient("localhost:8080", grpc_js_1.credentials.createInsecure());
        console.log('grpc client is running....');
    }
    getTeamIds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRequest = { userId };
            return new Promise((resolve, reject) => {
                this.client.getTeamIds(userRequest, (err, response) => {
                    if (err) {
                        console.error("Error in getTeamIds:", err);
                        return reject(err);
                    }
                    console.log("Response:", response);
                    resolve(response);
                });
            });
        });
    }
}
exports.GrpcClient = GrpcClient;
