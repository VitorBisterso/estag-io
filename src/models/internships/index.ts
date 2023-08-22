import { Filters } from '../filters';
import { OPPORTUNITY_TYPE } from '../opportunities';

export interface Internship {
   id: number;
   student?: {
      id: number;
      name: string;
   };
   initialDate: string;
   until: string;
   managerName: string;
   advisorName: string;
   job: {
      id: number;
      title: string;
      type: OPPORTUNITY_TYPE;
      company: {
         name: string;
      };
      salary: number;
      weeklyWorkload: number;
   };
}

export interface InternshipFilter extends Filters<Internship> {
   internName?: string;
   type?: OPPORTUNITY_TYPE;
   weeklyWorkload?: number;
}

export interface GetInternshipsResponse {
   list: Array<Internship>;
   count: number;
}
