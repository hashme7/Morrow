import { IPorjectReq } from "../interfaces/Types/useCasesTypes";

export class UseCases {
  private readonly repository;
  private readonly rabbitMQ;
  constructor(repository: any,rabbitMQ:any) {
    this.repository = repository;
    this.rabbitMQ = rabbitMQ
  }
  async createProject(
    data: IPorjectReq
  ): Promise<{ status: number; message: string }> {
    try {
      const project = await this.repository.create(data);
      const message = {
        projectId:project.id,
        projectName:project.name,
        teamId:project.teamId
      }
      await this.rabbitMQ.publish('project.team.creation',message);
      return {
        status: 201,
        message: "project creation succefully completed",
      };
    } catch (error) {
      console.log(`Error on createProjectUseCases:${error}`);
      return { status: 500, message: "Internel Server Error" };
    }
  }
  
}
