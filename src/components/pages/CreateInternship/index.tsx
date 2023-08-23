import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { INTERNSHIPS_PAGE } from '@/consts';
import validations from '@/hooks/useInternshipForm/validations';
import { useCreateInternshipMutation } from '@/services/internships';
import { InternshipFormContext } from '@/hooks/useInternshipForm';
import CreateInternshipTemplate from '@/components/templates/CreateInternship';
import { useGetSimplifiedOpportunitiesQuery } from '@/services';

export default function CreateInternshipPage() {
   const { t } = useTranslation('internships');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const { data: opportunities, isFetching: isFetchingOpportunities } =
      useGetSimplifiedOpportunitiesQuery(null);
   const [createInternship, { isLoading: isCreating }] =
      useCreateInternshipMutation();

   const formik = useFormik({
      initialValues: {
         initialDate: '',
         until: '',
         managerName: '',
         advisorName: '',
         studentId: 0,
         jobId: 0,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         createInternship(formik.values)
            .unwrap()
            .then(() => {
               toast.success(
                  t('success.created', {
                     ns: 'common',
                     object: t('labels.internship'),
                  }),
               );
               navigation.navigate(INTERNSHIPS_PAGE);
            });
      },
   });

   const providerValue = useMemo(
      () => ({
         formik,
         opportunities: opportunities ?? ([] as any),
         isLoading: isCreating || isFetchingOpportunities,
      }),
      [formik, opportunities, isCreating, isFetchingOpportunities],
   );

   return (
      <InternshipFormContext.Provider value={providerValue}>
         <CreateInternshipTemplate />
      </InternshipFormContext.Provider>
   );
}
