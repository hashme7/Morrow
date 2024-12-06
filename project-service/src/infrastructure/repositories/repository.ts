import { ObjectId } from "mongodb";
import prisma from "../../models/prismaClient";
import { IPorjectReq } from "../../interfaces/Types/request.interface";
import { IRepository } from "../../interfaces/repository.interface";
import { IProject } from "../../interfaces/Types";

export class Repository implements IRepository{
  constructor() {
    console.log("project repository is initialized.....");
  }
  async create(projectData: IPorjectReq) {
    try {
      const sanitizedDescription = projectData.description?.replace(
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
      return updatedProject;
    } catch (error) {
      console.error(`Error updating Team ID for project ${projectId}: `, error);
      throw error;
    }
  }
  async getProjectsByTeamIds (teamIds:string[]){
    try {
      console.log(teamIds,"teamIds:[]")
      const projects = await prisma.project.findMany({
        where:{
          teamId:{
            in:teamIds.map((id) => id.trim()),
          }
        }
      })
      console.log(`Projects fetched successfully: ${JSON.stringify(projects, null, 2)}`);
      return projects;
    } catch (error) {
      console.log(`error on finding project with teamids : ${error}`)
      throw error;
    }
  }
  async getProjectByTeamId(teamId:string):Promise<IProject>{
    try {
      const project = await prisma.project.findFirst({
        where:{
          teamId:teamId,
        }
      })
      if(project){
        return project;
      }else{
        throw new Error("no project are ther");
      }
    } catch (error) {
      console.log(`error on getting project by team id  ${error}`);
      throw error;
    }
  }
}
