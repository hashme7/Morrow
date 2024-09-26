"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectEntity = void 0;
class ProjectEntity {
    constructor(id, projectStartDate, projectEndDate, plannedStartDate, plannedEndDate, projectDescription, teamId) {
        this.id = id;
        this.projectStartDate = projectStartDate;
        this.projectEndDate = projectEndDate;
        this.plannedStartDate = plannedStartDate;
        this.plannedEndDate = plannedEndDate;
        this.projectDescription = projectDescription;
        this.teamId = teamId;
    }
}
exports.ProjectEntity = ProjectEntity;
