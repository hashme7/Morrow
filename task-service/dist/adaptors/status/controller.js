"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
class StatusController {
    constructor(statusRep) {
        this.statusRep = statusRep;
    }
    ;
    create(req, res) {
        try {
        }
        catch (error) {
            res.status(500).json('Internel Server Error');
        }
    }
}
exports.StatusController = StatusController;
