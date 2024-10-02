import { Request, Response } from "express";
import { IUsecase } from "../interfaces/usecase.interface";

export class Controller {
  private readonly useCases;
  constructor(useCases: IUsecase) {
    this.useCases = useCases;
    console.log("controller......");
  }
  async createProject(req: Request, res: Response) {
    try {
      console.log(req.body)
      const data = req.body;
      const response =await this.useCases.createProject(data);
      res.status(response.status).json({message:response.message});
    } catch (error) {
      console.log(`error on project creation ${error}`)
        return {
            status:500,
            message:"Internel Server Error"
        }
    }
  }
}
