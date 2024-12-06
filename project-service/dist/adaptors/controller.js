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
exports.Controller = void 0;
class Controller {
    constructor(createProjectCases, getProjectByUserIdCases) {
        this.createProjectCases = createProjectCases;
        this.getProjectByUserIdCases = getProjectByUserIdCases;
    }
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                const data = req.body;
                const response = yield this.createProjectCases.execute(data, userId);
                res.status(response.status).json({ message: response.message });
            }
            catch (error) {
                console.log(`error on project creation ${error}`);
                res.status(500).json({ message: "Internel Server Error" });
            }
        });
    }
    getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const { status, message, data } = yield this.getProjectByUserIdCases.execute(userId);
                console.log(`status,message
        
        ${status}${message}${data}
        
        `);
                res
                    .status(status)
                    .json({ message: message, data: data });
            }
            catch (error) {
                console.log(`Error on get project : ${error}`);
                res.status(500).json({ message: "Internel Server Error" });
            }
        });
    }
}
exports.Controller = Controller;
