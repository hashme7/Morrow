import { IUser } from "./user";

export interface response {
    status:number,
    message:string,
    tokens?:{
      accessToken?:string | null | undefined,
      refreshToken?:string | null | undefined
      user?:IUser |null
    },
    data?:IUser,
    valid?:boolean,
}

export interface IAddTeamMessage{
  projectId:number,
  teamId:string,
  projectName:string
}