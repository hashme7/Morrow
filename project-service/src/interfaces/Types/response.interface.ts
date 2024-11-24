import { IProject } from './EntitiesTypes';
export interface IResponse{
    status:number,
    message?:string
    data?:IProject[],
}

export interface ITeamIdRes{
    projectId:number,
    teamId:string
}