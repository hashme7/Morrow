import { apiRep } from "../../interfaces/apiRepository";
import { IApi } from "../../interfaces/response.interface";
import Api from "../../entities_models/apitool/apitesting";
import mongoose from "mongoose";

export class ApiRepository implements apiRep{
    async checkApi(projectId: number, method: string, url: string): Promise<boolean>{
        try {
             const apidetails = await Api.findOne({
               projectId,
               url,
               method,
             });
            if (apidetails) return true;
            return false;
        } catch (error) {
            throw error;
        }
    };
    async saveApi(api: IApi): Promise<IApi>{
        try {
            const savedApi = new Api(api);
            const result = await savedApi.save();
            const apiData: IApi = {
              _id: result._id as mongoose.Types.ObjectId,
              projectId: result.projectId as number,
              url: result.url as string,
              method: result.method as
                | "GET"
                | "POST"
                | "PUT"
                | "DELETE"
                | "PATCH"
                | "OPTIONS"
                | "HEAD",
              body: result.body,
            };
            return apiData;
        } catch (error) {
            throw error;
        }
    };
    async getApis(projectId: number): Promise<IApi[]>{
        try {
           return (await Api.find({projectId})) 
        } catch (error) {
            throw error;
        }
    };
}   