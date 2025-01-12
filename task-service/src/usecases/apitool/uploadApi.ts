import { apiRep } from "../../interfaces/apiRepository";
import { IApi } from "../../interfaces/response.interface";
import { IUploadApi } from "../../interfaces/usecase.interface";

export class UploadApi implements IUploadApi{
    constructor(private apitoolRep:apiRep){}
    execute(apiDetails: IApi): Promise<IApi> {
        try {
            return this.apitoolRep.saveApi(apiDetails);
        } catch (error) {
            throw error;
        }
    }
   
}