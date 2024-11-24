export interface IProject {
  id: number;
  name: string;
  projectStartDate?: Date | null;  // Allow null
  projectEndDate?: Date | null;    // Allow null
  plannedStartDate: Date | null;  // Allow null
  plannedEndDate: Date | null;    // Allow null
  projectDescription?: string | null;  // Allow null for optional fields
  teamId: string | null;
  createdAt: Date;
  updatedAt: Date;
}