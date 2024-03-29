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
   isApplied?: boolean;
   applicants?: Array<Applicant>;
}

export interface SimplifiedOpportunity {
   id: number;
   title: string;
   applicants: Array<{
      id: number;
      name: string;
   }>;
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
