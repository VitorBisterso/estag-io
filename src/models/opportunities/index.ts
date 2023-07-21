export type OPPORTUNITY_TYPE = 'REMOTE' | 'LOCAL';

export interface Opportunity {
   title: string;
   description: string;
   type: OPPORTUNITY_TYPE;
   salary: number;
   deadline: string;
   weeklyWorkload: number;
   isActive: boolean;
}
