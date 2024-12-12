import { Types } from "mongoose";
import { IStatus } from "../interfaces/response.interface";
import { IStatusRepository } from "../interfaces/statusRepository.interface";
import { IUpdateStatus } from "../interfaces/usecase.interface";

export class UpdateStatus implements IUpdateStatus{
    constructor(private statusRep:IStatusRepository){}
    async execute(team_id: Types.ObjectId, name: string, id: string): Promise<IStatus> {
        try {
            return (await this.statusRep.findStatusAndUpdate(team_id,name,id));
        } catch (error) {
            console.log(`error on updatign staus ${error}`)
            throw error;
        }
    }
}