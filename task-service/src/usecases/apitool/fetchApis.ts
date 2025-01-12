import { apiRep } from "../../interfaces/apiRepository";
import { IFetchApis } from "../../interfaces/usecase.interface";

export class FetchApis implements IFetchApis{
    constructor(private repository: apiRep) { }
    async execute(projectId: number) {
        try {
            return (await this.repository.getApis(projectId));
        } catch (error) {
            throw error;
        }
    }
}