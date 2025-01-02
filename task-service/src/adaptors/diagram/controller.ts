import { Request,Response } from "express";
import { ICreateDiagram } from "../../interfaces/usecase.interface";

export class DiagramController {
  constructor(private uploadDiagram:ICreateDiagram) {}
  async saveDiagram(req:Request,res:Response) {
    try {
      const { dbDesign } = req.body;
      const diagram = await (this.uploadDiagram.execute(dbDesign));
      res.status(200).json(diagram);
    } catch (error) {
      res.status(500).json("Internel Server Error");
    }
  }
}