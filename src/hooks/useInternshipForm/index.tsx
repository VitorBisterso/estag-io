import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';
import { SimplifiedOpportunity } from '@/models/opportunities';

export type InternshipFormValues = {
   studentId: number;
   jobId: number;
   initialDate: string;
   until: string;
   managerName: string;
   advisorName: string;
};

export type InternshipFormContextType = {
   formik: FormikContextType<InternshipFormValues>;
   isLoading: boolean;
   opportunities: Array<SimplifiedOpportunity>;
};

export const InternshipFormContext =
   createContext<InternshipFormContextType | null>(null);
export default function useInternshipForm() {
   return useContext(InternshipFormContext) as InternshipFormContextType;
}
