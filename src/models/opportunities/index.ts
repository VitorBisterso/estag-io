import { Filters } from '@/models/filters';

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
   applicants?: Array<{ id: number }>;
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

export interface ProcessStep {
   title: string;
   description: string;
   deadline: string;
   onlyOnDeadline: boolean;
   applicants: Array<number>;
}

export interface CreateProcessStepParams {
   opportunityId: number;
   processSteps: Array<ProcessStep>;
}

export interface UpdateProcessStepParams {
   opportunityId: number;
   processSteps: Array<ProcessStep>;
   newApplicants: Array<number>;
   removedApplicants: Array<number>;
}
