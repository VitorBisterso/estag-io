import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

import { OPPORTUNITY_TYPE } from '@/models/opportunities';

export type OpportunityFormValues = {
   title: string;
   description: string;
   type: OPPORTUNITY_TYPE;
   salary: string;
   deadline: string;
   weeklyWorkload: number;
   isActive: boolean;
};

export type OpportunityFormContextType = {
   formik: FormikContextType<OpportunityFormValues>;
   isLoading: boolean;
};

export const OpportunityFormContext =
   createContext<OpportunityFormContextType | null>(null);
export default function useOpportunityForm() {
   return useContext(OpportunityFormContext) as OpportunityFormContextType;
}
