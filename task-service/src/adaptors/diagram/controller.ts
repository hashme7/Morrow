import { Request, Response } from "express";
import {
  ICreateDiagram,
  IFetchDiagram,
} from "../../interfaces/usecase.interface";

export class DiagramController {
  constructor(
    private uploadDiagram: ICreateDiagram,
    private fetchDiagram: IFetchDiagram
  ) {}
  async saveDiagram(req: Request, res: Response) {
    try {
      const { dbDesign } = req.body;
      const diagram = await this.uploadDiagram.execute(dbDesign);
      res.status(200).json(diagram);
    } catch (error) {
      res.status(500).json("Internel Server Error");
    }
  }
  async getDiagram(req: Request, res: Response) {
    try {
      const { projectId } = req.query;
      const diagram = await this.fetchDiagram.execute(Number(projectId));
      res.status(200).json(diagram);
    } catch (error) {
      res.status(500).json("Internel Server Error");
    }
  }
}
