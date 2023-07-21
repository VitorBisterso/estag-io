import { Filters } from '@/models/filters';

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

export interface OpportunityFilter extends Filters<Opportunity> {
   title?: string;
   type?: OPPORTUNITY_TYPE;
   weeklyWorkload?: number;
}
