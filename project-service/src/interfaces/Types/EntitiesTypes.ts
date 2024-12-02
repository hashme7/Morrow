export interface IProject {
  id: number;
  name: string;
  projectStartDate: Date | null;  
  projectEndDate: Date | null;    
  plannedStartDate: Date; 
  plannedEndDate: Date;    
  projectDescription: string | null; 
  teamId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}