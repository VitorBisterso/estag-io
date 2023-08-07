import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

import { OPPORTUNITY_TYPE } from '@/models/opportunities';

export type CreateOpportunityValues = {
   title: string;
   description: string;
   type: OPPORTUNITY_TYPE;
   salary: number;
   deadline: string;
   weeklyWorkload: number;
   isActive: boolean;
};

export type CreateOpportunityContextType = {
   formik: FormikContextType<CreateOpportunityValues>;
   isLoading: boolean;
};

export const CreateOpportunityContext =
   createContext<CreateOpportunityContextType | null>(null);
export default function useCreateOpportunity() {
   return useContext(CreateOpportunityContext) as CreateOpportunityContextType;
}
