import { IProject } from "../Types";
import { IPorjectReq } from "../Types/request.interface";


export interface IRepository{
    create(projectData: IPorjectReq):Promise<IProject | undefined>;
    updateTeamId(projectId:number,teamId:string):Promise<IProject>;
    getProjectsByTeamIds(teamIds:string[]):Promise<IProject[]>;
    getProjectByTeamId(teamId:string):Promise<IProject>;
}