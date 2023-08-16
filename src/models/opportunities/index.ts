import { Filters } from '@/models/filters';
import { Applicant } from '../processSteps';

export type OPPORTUNITY_TYPE = 'REMOTE' | 'LOCAL';

export interface Opportunity {
   id: number;
   title: string;
   description: string;
   type: OPPORTUNITY_TYPE;
   salary: number;
   deadline: string;
   weeklyWorkload: number;
   companyName?: string;
   isActive?: boolean;
   applied?: boolean;
   applicants?: Array<Applicant>;
}

export interface OpportunityFilter extends Filters<Opportunity> {
   title?: string;
   type?: OPPORTUNITY_TYPE;
   weeklyWorkload?: number;
   registeredOnly?: boolean;
}

export interface GetOpportunitiesResponse {
   list: Array<Opportunity>;
   count: number;
}

export interface CreateOpportunityParams {
   title: string;
   description: string;
   type: OPPORTUNITY_TYPE;
   salary: string;
   deadline: string;
   weeklyWorkload: number;
   isActive: boolean;
}
