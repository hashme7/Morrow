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
exports.StatusRepository = void 0;
const status_1 = require("../../entities_models/status");
class StatusRepository {
    constructor() {
        this.defaultStatus = [
            { id: "todo", name: "To Do", color: "#8B5CF6" },
            { id: "on-progress", name: "On Progress", color: "#3B82F6" },
            { id: "completed", name: "Completed", color: "#22C55E" },
        ];
    }
    findOneAndDelete(team_id, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield status_1.Status.deleteOne({ team_id: team_id, id: id });
            }
            catch (error) {
                console.log("error deleting status", error);
                throw error;
            }
        });
    }
    seedStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const status of this.defaultStatus) {
                const exists = yield status_1.Status.findOne({ id: status.id });
                if (!exists) {
                    yield status_1.Status.create(status);
                }
            }
        });
    }
    findManyStatus(team_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const status of this.defaultStatus) {
                    const exists = yield status_1.Status.findOne({
                        id: status.id,
                        team_id: team_id,
                    });
                    if (!exists) {
                        yield status_1.Status.create(Object.assign(Object.assign({}, status), { team_id: team_id }));
                    }
                    else {
                        return yield status_1.Status.find({ team_id: team_id });
                    }
                }
                return yield status_1.Status.find({ team_id: team_id });
            }
            catch (error) {
                console.log("error finding status", error);
                throw error;
            }
        });
    }
    insertStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(status.color, "statuscolor");
                const newStatus = new status_1.Status(status);
                const savedStatus = yield newStatus.save();
                if (savedStatus) {
                    return savedStatus;
                }
                else {
                    throw new Error("Status is not created");
                }
            }
            catch (error) {
                console.log("error on insertStatus", error);
                throw error;
            }
        });
    }
    findAStatus(id, team_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield status_1.Status.findOne({ id: id, team_id: team_id });
            }
            catch (error) {
                console.log("error on finding status");
                throw error;
            }
        });
    }
    findStatusAndUpdate(team_id, name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedStatus = yield status_1.Status.findOneAndUpdate({ team_id: team_id, id: id }, { $set: { name: name } }, { new: true });
                if (updatedStatus) {
                    return updatedStatus;
                }
                else {
                    throw new Error("can't able update the status");
                }
            }
            catch (error) {
                console.log("error on upating staus");
                throw error;
            }
        });
    }
}
exports.StatusRepository = StatusRepository;
