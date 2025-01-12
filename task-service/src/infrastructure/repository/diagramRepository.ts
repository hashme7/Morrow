import mongoose, { ObjectId, Types } from "mongoose";
import { IDBRepository } from "../../interfaces/DBRepository";
import Diagram from "../../entities_models/diagram/diagram";
import { IDbDesign } from "../../interfaces/response.interface";
import DbDesignModal from "../../entities_models/diagram/diagram";

export class DiagramRepository implements IDBRepository {
  constructor() { }
  async getDiagram(projectId: number): Promise<IDbDesign | null> {
    try {
      return (await DbDesignModal.findOne({projectId}));
    } catch (error) {
      throw error;
    }
  }
  async save(dbDesign: IDbDesign): Promise<IDbDesign | null> {
    try {
      const filter = { projectId: dbDesign.projectId };
      const update = {
        nodes: dbDesign.nodes,
        edges: dbDesign.edges,
        viewport:dbDesign.viewport,
      }
      const options = {
        new: true,
        upsert: true,
        useFindAndModify:false,
      }
      const savedDiagram = await DbDesignModal.findOneAndUpdate(filter, update, options);
      if (!savedDiagram) return null;
      return savedDiagram;
    } catch (error) {
      throw error;
    }
  }
  
}
