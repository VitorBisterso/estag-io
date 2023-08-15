import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useToast from '@/hooks/useToast';
import { useCreateOpportunityMutation } from '@/services';
import { OpportunityFormContext } from '@/hooks/useOpportunityForm';
import { OPPORTUNITY_TYPE } from '@/models/opportunities';
import CreateOpportunityTemplate from '@/components/templates/CreateOpportunity';
import { OPPORTUNITIES_PAGE } from '@/consts';
import validations from '@/hooks/useOpportunityForm/validations';

export default function CreateOpportunityPage() {
   const { t } = useTranslation('opportunities');
   const toast = useToast();
   const navigation = useNavigation<any>();

   const [createOpportunity, { isLoading: isCreating }] =
      useCreateOpportunityMutation();

   const formik = useFormik({
      initialValues: {
         title: '',
         description: '',
         type: 'REMOTE' as OPPORTUNITY_TYPE,
         salary: '0' as any,
         deadline: '',
         weeklyWorkload: 0,
         isActive: false,
      },
      validationSchema: validations(t),
      onSubmit: () => {
         const { salary: maskedSalary, weeklyWorkload: workload } =
            formik.values;

         const salary = maskedSalary
            .slice(3)
            .replaceAll('.', '')
            .replaceAll(',', '.');
         const weeklyWorkload = Number(workload);

         createOpportunity({ ...formik.values, salary, weeklyWorkload })
            .unwrap()
            .then(() => {
               toast.success(
                  t('success.created', {
                     ns: 'common',
                     object: t('labels.opportunity'),
                  }),
               );
               navigation.navigate(OPPORTUNITIES_PAGE);
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
      <OpportunityFormContext.Provider value={providerValue}>
         <CreateOpportunityTemplate />
      </OpportunityFormContext.Provider>
   );
}
