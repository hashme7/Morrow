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
exports.DiagramRepository = void 0;
const diagram_1 = __importDefault(require("../../entities_models/diagram/diagram"));
class DiagramRepository {
    constructor() { }
    getDiagram(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield diagram_1.default.findOne({ projectId }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    save(dbDesign) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { projectId: dbDesign.projectId };
                const update = {
                    nodes: dbDesign.nodes,
                    edges: dbDesign.edges,
                    viewport: dbDesign.viewport,
                };
                const options = {
                    new: true,
                    upsert: true,
                    useFindAndModify: false,
                };
                const savedDiagram = yield diagram_1.default.findOneAndUpdate(filter, update, options);
                if (!savedDiagram)
                    return null;
                return savedDiagram;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.DiagramRepository = DiagramRepository;
