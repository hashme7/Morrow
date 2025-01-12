import { IDBRepository } from "../../interfaces/DBRepository";

export class FetchDiagram{
    constructor(private repository: IDBRepository) { }
    async execute(projectId:number) {
        try {
            return (await this.repository.getDiagram(projectId));
        } catch (error) {
            throw error;
        }
    }
}