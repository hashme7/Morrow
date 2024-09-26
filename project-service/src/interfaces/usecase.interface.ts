import { IPorjectReq } from "./Types/useCasesTypes";

export interface IUsecase{
    createProject(data:IPorjectReq):Promise<{status:number,message:string}>;
}