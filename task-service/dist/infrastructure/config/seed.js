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
exports.seedStatus = void 0;
const status_1 = require("../../entities_models/status");
const deafulStatus = [
    { "id": "todo", "title": "To Do" },
    { "id": "on-progress", "title": "On Progress" },
    { "id": "completed", "title": "Completed" }
];
const seedStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const status of deafulStatus) {
        const exists = yield status_1.Status.findOne({ id: status.id });
        if (!exists) {
            yield status_1.Status.create(status);
        }
    }
});
exports.seedStatus = seedStatus;
