export interface ITeam {
  name: string;
  projectId: string;
}

export interface ITeamIds{
    teamIds:number[];
}

export interface IProject {
  id: number;
  name: string;
  projectStartDate: Date | null;  
  projectEndDate: Date | null;    
  plannedStartDate: Date; 
  plannedEndDate: Date;    
  projectDescription:string; 
  teamId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IDate = {
    calender?: { identifier: string };
    year: number;
    month: number;
    day: number;
}