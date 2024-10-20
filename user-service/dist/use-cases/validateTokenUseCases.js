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
exports.ValidateToken = void 0;
const morrow_common_1 = require("morrow-common");
class ValidateToken {
    constructor() { }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`validateToken`, token);
                const decoded = morrow_common_1.JWTService.verifyToken(token);
                console.log(`decoded:
            
            `, decoded);
                if (decoded) {
                    console.log("token valid");
                    return {
                        status: 200,
                        message: "Token is valid",
                        valid: true,
                    };
                }
                else {
                    console.log("token invalid");
                    return {
                        status: 401,
                        message: "Token is invalid",
                        valid: false,
                    };
                }
            }
            catch (error) {
                console.error(`Error validating token: ${error}`);
                return {
                    status: 500,
                    message: "Internal server error",
                };
            }
        });
    }
}
exports.ValidateToken = ValidateToken;
