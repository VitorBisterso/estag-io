import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import useToast from '@/hooks/useToast';
import { useCreateOpportunityMutation } from '@/services';
import { CreateOpportunityContext } from '@/hooks/useCreateOpportunity';
import { OPPORTUNITY_TYPE } from '@/models/opportunities';
import CreateOpportunityForm from '@/components/organisms/OpportunityForm/Create';
import validations from './validations';

export default function CreateOpportunity() {
   const { t } = useTranslation('opportunities');
   const toast = useToast();

   const [createOpportunity, { isLoading: isCreating }] =
      useCreateOpportunityMutation();

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         type: 'REMOTE' as OPPORTUNITY_TYPE,
         salary: 0,
         deadline: 'string',
         weeklyWorkload: 0,
         isActive: false,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         createOpportunity(formik.values)
            .unwrap()
            .then(() => {
               toast.success(
                  t('success.created', {
                     ns: 'common',
                     object: t('labels.opportunity'),
                  }),
               );
            });
      },
   });

   const providerValue = useMemo(
      () => ({
         formik,
         isLoading: isCreating,
      }),
      [formik, isCreating],
   );

   return (
      <CreateOpportunityContext.Provider value={providerValue}>
         <CreateOpportunityForm />
      </CreateOpportunityContext.Provider>
   );
}
