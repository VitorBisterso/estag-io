import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

export type ProcessStepFormValues = {
   title: string;
   description: string;
   deadline: string;
   onlyOnDeadline: boolean;
   everyone: boolean;
   applicants: Array<number>;
};

export type ProcessStepFormContextType = {
   formik: FormikContextType<ProcessStepFormValues>;
   isLoading: boolean;
};

export const ProcessStepFormContext =
   createContext<ProcessStepFormContextType | null>(null);
export default function useProcessStepForm() {
   return useContext(ProcessStepFormContext) as ProcessStepFormContextType;
}
