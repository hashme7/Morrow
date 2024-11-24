import { Request, Response } from "express";
import { ICreateProjectCases, IGetProjectsByUserId } from "../interfaces/usecase.interface";

export class Controller {
  private readonly createProjectCases:ICreateProjectCases;
  private readonly getProjectByUserIdCases:IGetProjectsByUserId;
  constructor(createProjectCases: ICreateProjectCases,getProjectByUserIdCases:IGetProjectsByUserId) {
    this.createProjectCases = createProjectCases;
    this.getProjectByUserIdCases = getProjectByUserIdCases;
    console.log("controller......");
  }
  async createProject(req: Request, res: Response) {
    try {
      const {userId} = req.query;
      const data = req.body;
      const response = await this.createProjectCases.execute(data,userId as string);
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.log(`error on project creation ${error}`);
      res.status(500).json({message:"Internel Server Error"});
    }
  }
  async getProject(req:Request,res:Response){
    const {userId} = req.params;
    try{
      const response = await this.getProjectByUserIdCases.execute(userId);
      res.status(response.status).json({message:response.message,data:response.data});
    }catch(error){
      console.log(`Error on get project : ${error}`);
      res.status(500).json({message:"Internel Server Error"})
    }
  }
}
