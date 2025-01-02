import { IDBRepository } from "../../interfaces/DBRepository";
import { IDbDesign } from "../../interfaces/response.interface";

export class SaveDiagram {
  constructor(private dbRepository: IDBRepository) {}
  async execute(dbDesign: IDbDesign) {
    try {
      return await this.dbRepository.save(dbDesign);
    } catch (error) {
      throw error;
    }
  }
}
