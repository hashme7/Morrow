export class ProjectEntity {
    constructor(
      public id: number,
      public name:string,
      public projectStartDate: Date,
      public projectEndDate: Date,
      public plannedStartDate: Date,
      public plannedEndDate?: Date,
      public projectDescription?: string,
      public teamId?: string,
    ) {}
  }