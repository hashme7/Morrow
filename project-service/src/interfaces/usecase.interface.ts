import { Message } from "amqplib";
import { IResponse } from "./Types/response.interface";
import { IPorjectReq } from "./Types/useCasesTypes";

export interface IUsecase{
    createProject(data:IPorjectReq):Promise<{status:number,message:string}>;
}

export interface ICreateProjectCases {
    execute(data:IPorjectReq,userId:string):Promise<{status:number,message:string}>;
}

export interface IUpdateProjectCases{
    execute(message:Message):Promise<IResponse>;
}

export interface IGetProjectsByUserId {
    execute(userId:string):Promise<IResponse>;
}