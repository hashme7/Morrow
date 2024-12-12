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
exports.StatusController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class StatusController {
    constructor(createStatus, getStatus, updateStatus, deleteStatus) {
        this.createStatus = createStatus;
        this.getStatus = getStatus;
        this.updateStatus = updateStatus;
        this.deleteStatus = deleteStatus;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statusData = req.body;
                console.log(statusData, "afdsjfaksdjf");
                const newStatus = yield this.createStatus.execute(statusData);
                res.status(201).json({ data: newStatus });
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { team_id } = req.params;
                const status = yield this.getStatus.execute(new mongoose_1.default.Types.ObjectId(team_id));
                res.status(200).json({ data: status });
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { team_id } = req.params;
                const { name, id } = req.body;
                const updatedStatus = yield this.updateStatus.execute(new mongoose_1.default.Types.ObjectId(team_id), name, id);
                res.status(200).json({ data: updatedStatus });
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { team_id } = req.params;
                const { id } = req.query;
                yield this.deleteStatus.execute(new mongoose_1.default.Types.ObjectId(team_id), id);
                res.status(200).json({ data: id });
            }
            catch (error) {
                res.status(500).json("Internel Server Error");
            }
        });
    }
}
exports.StatusController = StatusController;
