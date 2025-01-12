"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadApi = void 0;
class UploadApi {
    constructor(apitoolRep) {
        this.apitoolRep = apitoolRep;
    }
    execute(apiDetails) {
        try {
            return this.apitoolRep.saveApi(apiDetails);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UploadApi = UploadApi;
