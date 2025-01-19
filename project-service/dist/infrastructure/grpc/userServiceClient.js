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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcClient = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const cmn_js_1 = require("morrow-common/dist/grpc/cmn.js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
class GrpcClient {
    constructor() {
        this.client = new cmn_js_1.UserServiceClient(process.env.GRPC_USER_SERVICE_URI || "localhost:8080", grpc_js_1.credentials.createInsecure());
        console.log("grpc client is running....", process.env.GRPC_USER_SERVICE_URI);
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
                    resolve(response);
                });
            });
        });
    }
}
exports.GrpcClient = GrpcClient;
