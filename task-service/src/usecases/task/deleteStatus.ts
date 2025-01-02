import { Types } from "mongoose";
import { IDeleteStatus } from "../../interfaces/usecase.interface";
import { IStatusRepository } from "../../interfaces/statusRepository.interface";

export class DeleteStatus implements IDeleteStatus {
  constructor(private statusRep: IStatusRepository) {}
  async execute(team_id: Types.ObjectId, id: string): Promise<void> {
    try {
      await this.statusRep.findOneAndDelete(team_id, id);
      return;
    } catch (error) {
      throw error;
    }
  }
}
