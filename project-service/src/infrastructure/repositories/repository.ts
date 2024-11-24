import { ObjectId } from "mongodb";
import prisma from "../../models/prismaClient";
import { IPorjectReq } from "../../interfaces/Types/useCasesTypes";

export class Repository {
  constructor() {
    console.log("project repository is initialized.....");
  }
  async create(projectData: IPorjectReq) {
    try {
      const id = new ObjectId();
      const sanitizedDescription = projectData.projectDescription?.replace(
        /\0/g,
        ""
      );

      const plannedStartDate = new Date(
        projectData.plannedStartDate.year,
        projectData.plannedStartDate.month - 1,
        projectData.plannedStartDate.day
      );
      const plannedEndDate = new Date(
        projectData.plannedEndDate.year,
        projectData.plannedEndDate.month - 1,
        projectData.plannedEndDate.day
      );

      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          projectStartDate: null,
          projectEndDate: null,
          plannedStartDate: plannedStartDate,
          plannedEndDate: plannedEndDate,
          projectDescription: sanitizedDescription,
        },
      });
      return project;
    } catch (error) {
      console.log("Error on saving project:", error);
    }
  }

  async updateTeamId(projectId: number, teamId: string) {
    try {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: { teamId: teamId },
      });
      console.log(`Project ID ${projectId} updated with Team ID: ${teamId}`);
      return updatedProject;
    } catch (error) {
      console.error(`Error updating Team ID for project ${projectId}: `, error);
      throw error;
    }
  }
  async getProjectsByTeamIds (teamIds:string[]){
    try {
      const projects = await prisma.project.findMany({
        where:{
          teamId:{
            in:teamIds,
          }
        }
      })
      return projects;
    } catch (error) {
      console.log(`error on finding project with teamids : ${error}`)
      throw error;
    }
  }
}
