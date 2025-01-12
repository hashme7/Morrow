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
exports.ApiController = void 0;
class ApiController {
    constructor(sendApi, checkApi, uploadApi, fetchApis) {
        this.sendApi = sendApi;
        this.checkApi = checkApi;
        this.uploadApi = uploadApi;
        this.fetchApis = fetchApis;
    }
    sendToTargetApi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url, method, body, queryParams, headers } = req.body;
                const response = yield this.sendApi.execute({
                    url,
                    method,
                    body,
                    queryParams,
                    headers,
                });
                res.status(200).json(response);
            }
            catch (error) {
                console.log("error :", error);
                res.status(500).json("Internel Server Error");
            }
        });
    }
    saveApi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, url, method, body, response } = req.body;
                const alreadythere = yield this.checkApi.execute(projectId, method, url);
                if (alreadythere) {
                    console.log(alreadythere);
                    res.status(302).json("API request is Already saved in Db");
                }
                else {
                    const data = yield this.uploadApi.execute({
                        projectId,
                        url,
                        method,
                        body,
                        response,
                    });
                    if (response) {
                        res.status(201).json(data);
                    }
                }
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
    getApi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const data = yield this.fetchApis.execute(Number(projectId));
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
}
exports.ApiController = ApiController;
