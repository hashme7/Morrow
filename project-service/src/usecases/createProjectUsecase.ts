import { IPorjectReq } from "../interfaces/Types/useCasesTypes";
import { IUpdateProjectCases } from "../interfaces/usecase.interface";

export class CreateProject {
  private readonly repository;
  private readonly rabbitMQ;
  private readonly updateProjectCases: IUpdateProjectCases;
  constructor(
    repository: any,
    rabbitMQ: any,
    updateProjectCases: IUpdateProjectCases
  ) {
    this.repository = repository;
    this.rabbitMQ = rabbitMQ;
    this.updateProjectCases = updateProjectCases;
  }
  async execute(
    data: IPorjectReq,
    userId: string
  ): Promise<{ status: number; message: string }> {
    try {
      const project = await this.repository.create(data);
      const message = {
        projectId: project.id,
        projectName: project.name,
        userId: userId,
      };
      await this.rabbitMQ.publish("project.team.creation", message);
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
