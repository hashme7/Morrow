import { Request, Response } from "express";
import {
  ICreateProjectCases,
  IGetProjectsByUserId,
} from "../interfaces/usecase.interface";

export class Controller { 
  constructor(
    private createProjectCases: ICreateProjectCases,  
    private getProjectByUserIdCases: IGetProjectsByUserId
  ) {}
  async createProject(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const data = req.body;  
      const response = await this.createProjectCases.execute(
        data,
        userId as string  
      );  
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.log(`error on project creation ${error}`);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
  async getProject(req: Request, res: Response) {
    const { userId } = req.params;
    console.log(`
      
      userId:${userId};
      `)
    try {
      const {status,message,data} = await this.getProjectByUserIdCases.execute(userId);
      console.log(`status,message
        
        ${status}${message}${data}
        
        `,)
      res
        .status(status)
        .json({ message: message, data:data });
    } catch (error) {
      console.log(`Error on get project : ${error}`);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
}
