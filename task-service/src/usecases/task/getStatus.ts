import mongoose, { Types } from "mongoose";
import { IStatus } from "../../interfaces/response.interface";
import { IStatusRepository } from "../../interfaces/statusRepository.interface";
import { IGetStatus } from "../../interfaces/usecase.interface";

export class GetStatus implements IGetStatus{
    constructor(private statusRep:IStatusRepository){}
    async execute(team_id: Types.ObjectId): Promise<IStatus[]> {
        try {
            return (await this.statusRep.findManyStatus(new mongoose.Types.ObjectId(team_id)));
        } catch (error) {
            throw error;
        }
    }
    
}