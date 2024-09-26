import { IProject } from "./Types/EntitiesTypes";

export interface IRepository{
    create():Promise<IProject>;
}