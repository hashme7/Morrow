import { IApi } from "../response.interface";

export interface apiRep{
    saveApi: (api: IApi) => Promise<IApi>
    checkApi: (projectId: number, method: string, url: string) => Promise<boolean>;
    getApis:(projectId:number)=>Promise<IApi [ ]>
}