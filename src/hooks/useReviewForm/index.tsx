import { createContext, useContext } from 'react';
import { FormikContextType } from 'formik';

export type ReviewFormValues = {
   description: string;
   rating: number;
};

export type ReviewFormContextType = {
   formik: FormikContextType<ReviewFormValues>;
   isLoading: boolean;
};

export const ReviewFormContext = createContext<ReviewFormContextType | null>(
   null,
);
export default function useReviewForm() {
   return useContext(ReviewFormContext) as ReviewFormContextType;
}
