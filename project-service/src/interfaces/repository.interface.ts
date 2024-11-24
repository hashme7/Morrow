import { ITeamIds } from "./Types";
import { IProject } from "./Types/EntitiesTypes";
import { IPorjectReq } from "./Types/useCasesTypes";

export interface IRepository{
    create(projectData: IPorjectReq):Promise<IProject | undefined>;
    updateTeamId(projectId:number,teamId:string):Promise<IProject>;
    getProjectsByTeamIds(teamIds:string[]):Promise<IProject[]>;
}