import { apiRep } from "../../interfaces/apiRepository";
import { ICheckApi } from "../../interfaces/usecase.interface";

export class CheckApi implements ICheckApi {
  constructor(private apiRep: apiRep) {}
  async execute(
    projectId: number,
    method: string,
    url: string
  ): Promise<boolean> {
    try {
      return this.apiRep.checkApi(projectId, method, url);
    } catch (error) {
      throw error;
    }
  }
}
