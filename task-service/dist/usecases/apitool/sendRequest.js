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
exports.SendRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class SendRequest {
    constructor() { }
    execute(targetDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const validHeaders = targetDetails.headers
                ? Object.fromEntries(Object.entries(targetDetails.headers).filter(([key, value]) => typeof key === "string" &&
                    key.trim() !== "" &&
                    typeof value === "string" &&
                    value.trim() !== ""))
                : { "Content-Type": "application/json" };
            const validParams = targetDetails.queryParams
                ? Object.fromEntries(Object.entries(targetDetails.queryParams).filter(([key, value]) => typeof key === "string" &&
                    key.trim() !== "" &&
                    typeof value === "string" &&
                    value.trim() !== ""))
                : {};
            const startTime = performance.now();
            try {
                const response = yield (0, axios_1.default)({
                    url: targetDetails.url,
                    method: targetDetails.method,
                    data: targetDetails.body,
                    headers: validHeaders,
                    params: validParams,
                });
                const endTime = performance.now();
                const time = Math.round(endTime - startTime);
                return {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                    body: response.data,
                    time,
                };
            }
            catch (error) {
                const endTime = performance.now();
                const time = Math.round(endTime - startTime);
                if (error) {
                    return {
                        status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
                        headers: (_b = error.response) === null || _b === void 0 ? void 0 : _b.headers,
                        body: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || ((_d = error.response) === null || _d === void 0 ? void 0 : _d.statusText),
                        time,
                    };
                }
                console.log("error on", error);
                throw new Error(error.message || "Unexpected error occurred while sending API request.");
            }
        });
    }
}
exports.SendRequest = SendRequest;
