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
exports.ApiRepository = void 0;
const apitesting_1 = __importDefault(require("../../entities_models/apitool/apitesting"));
class ApiRepository {
    checkApi(projectId, method, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apidetails = yield apitesting_1.default.findOne({
                    projectId,
                    url,
                    method,
                });
                if (apidetails)
                    return true;
                return false;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    saveApi(api) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedApi = new apitesting_1.default(api);
                const result = yield savedApi.save();
                const apiData = {
                    _id: result._id,
                    projectId: result.projectId,
                    url: result.url,
                    method: result.method,
                    body: result.body,
                };
                return apiData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    getApis(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield apitesting_1.default.find({ projectId }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
}
exports.ApiRepository = ApiRepository;
