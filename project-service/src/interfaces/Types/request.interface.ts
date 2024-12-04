
export interface IPorjectReq {
    name: string;
    projectStartDate?: {
      calender?: { identifier: string };
      year: number;
      month: number;
      day: number;
    };
    projectEndDate?: {
      calender?: { identifier: string };
      year: number;
      month: number;
      day: number;
    };
    plannedStartDate: {
      calender?: { identifier: string };
      year: number;
      month: number;
      day: number;
    };
    plannedEndDate: {
      calender?: { identifier: string };
      year: number;
      month: number;
      day: number;
    };
    description: string;
    teamId?: string;
  }