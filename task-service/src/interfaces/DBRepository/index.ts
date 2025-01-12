import mongoose, { ObjectId, Types } from "mongoose";
import { IDbDesign } from "../response.interface";

export interface IDBRepository {
    save(dbDesign: IDbDesign): Promise<IDbDesign | null>;
    getDiagram(projectId: number): Promise<IDbDesign | null>;
}
