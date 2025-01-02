import { IStatus } from "../../interfaces/response.interface";
import { IStatusRepository } from "../../interfaces/statusRepository.interface";
import { ICreateStatus } from "../../interfaces/usecase.interface";

export class CreateStatus implements ICreateStatus{
    constructor(private statusRep:IStatusRepository){}
    async execute(status: IStatus): Promise<IStatus> {
        try {
           return (await this.statusRep.insertStatus(status));
        } catch (error) {
            throw error
        }
    }
}