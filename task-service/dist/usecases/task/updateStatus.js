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
exports.UpdateStatus = void 0;
class UpdateStatus {
    constructor(statusRep) {
        this.statusRep = statusRep;
    }
    execute(team_id, name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.statusRep.findStatusAndUpdate(team_id, name, id));
            }
            catch (error) {
                console.log(`error on updatign staus ${error}`);
                throw error;
            }
        });
    }
}
exports.UpdateStatus = UpdateStatus;
