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
