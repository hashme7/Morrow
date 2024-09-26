export interface IProject {
  id: number;
  name:string,
  projectStartDate: Date;
  projectEndDate: Date;
  plannedStartDate: Date;
  plannedEndDate?: Date;
  projectDescription?: string;
  teamId?: string;
}
