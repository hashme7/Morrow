import { ObjectId } from 'mongodb';
import prisma from "../../models/prismaClient";

import { ProjectEntity } from "../../entities_models/projectEntity";

export class Repository {
  constructor() {
    console.log("project repository is initialized.....");
  }
  async create(projectData: ProjectEntity) {
    try {
      const id = new ObjectId();
      const sanitizedDescription = projectData.projectDescription?.replace(/\0/g, '');
      const project = await prisma.project.create({
        data: { 
          teamId:String(id),
          name:projectData.name,
          projectStartDate: new Date(projectData.projectStartDate),
          projectEndDate: new Date(projectData.projectEndDate),
          plannedStartDate: projectData.plannedStartDate
            ? new Date(projectData.plannedStartDate)
            : null,
          plannedEndDate: projectData.plannedEndDate
            ? new Date(projectData.plannedEndDate)
            : null,
          projectDescription: sanitizedDescription,
        },
      });
      return project;
    } catch (error) {
      console.log("error on saving project", error);
    }
  }
}